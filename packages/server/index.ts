import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs'
import path from 'path'
import serialize from 'serialize-javascript'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import { createClientAndConnect } from './db'

dotenv.config()

const port = process.env.SERVER_PORT || 3000
const clientPath = path.join(__dirname, '../client')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  app.use(cors())

  await createClientAndConnect()

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get('*', async (req, res, next) => {
    // @ts-ignore
    global.Image = class {
      constructor() {
        return
      }
    }

    // @ts-ignore
    global.window = {
      sessionStorage: {
        setItem: () => undefined,
        getItem: () => undefined,
        clear: undefined,
        key: undefined,
        removeItem: undefined,
        length: 0,
      },
    }

    const url = req.originalUrl
    try {
      let renderHtmlModule: Record<string, any>
      let template: string

      if (vite) {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        template = await vite?.transformIndexHtml(url, template)
        renderHtmlModule = await vite?.ssrLoadModule(
          path.join(clientPath, '/src/entry-server.tsx')
        )
      } else {
        template = fs.readFileSync(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.cjs'
        )

        renderHtmlModule = await import(pathToServer)
      }
      const appHtml = await renderHtmlModule.default(req)
      const html = template
        ?.replace('<!--ssr-outlet-->', appHtml.html)
        .replace(
          '<!--ssr-initial-state-->',
          `<script>window.APP_INITIAL_STATE = ${serialize(
            appHtml.initialState,
            { isJSON: true }
          )}</script>`
        )
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite?.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
