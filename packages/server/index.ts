import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
// import type { RequestHandler } from 'express'
import express from 'express'
import fs from 'fs'
import path from 'path'
import serialize from 'serialize-javascript'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import { ReactionController } from './controllers/reaction-sql'
import { UserThemeController } from './controllers/user_theme'
import { createClientAndConnect } from './db'
import { sequelize } from './instances/sequelize'
import { ReactionModel } from './models/reaction-sql'
import { UserThemeModel } from './models/user_theme'
import './relationships'
import commentRoutes from './routes/comment'
import topicRoutes from './routes/topic'

dotenv.config()

const port = process.env.SERVER_PORT || 3000
const clientPath = path.join(__dirname, '../../client')
const isDev = process.env.NODE_ENV === 'development'

async function createServer() {
  const app = express()
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )
  app.use(express.json())
  app.use(cookieParser())
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, {
      body: req.body,
      params: req.params,
      cookies: req.cookies,
    })
    next()
  })

  try {
    // Инициализируем таблицы при запуске
    await ReactionModel.initializeTables()
    await UserThemeModel.initializeTables()
  } catch (error) {
    console.error('Failed to initialize database:', error)
  }

  await createClientAndConnect()

  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  // TODO: пофиксить в 9м спринте
  // const isUserLoggedInMiddleware: RequestHandler = (req, res, next) => {
  //   if (req.cookies.authCookie) {
  //     next()
  //   } else {
  //     res.status(403).json({ message: 'Forbidden' })
  //   }
  // }

  app.use('/api/topics/', topicRoutes)
  app.use('/api/comments/', commentRoutes)

  app.post('/api/topics/:topicId/reactions', (req, res) =>
    ReactionController.toggleReaction(req, res)
  )
  app.get('/api/topics/:topicId/reactions', (req, res) =>
    ReactionController.getReactions(req, res)
  )
  app.get('/api/emojis', (req, res) =>
    ReactionController.getAvailableEmojis(req, res)
  )

  app.post('/api/theme/set/:userId', (req, res) =>
    UserThemeController.updateTheme(req, res)
  )
  app.get('/api/theme/get/:userId', (req, res) =>
    UserThemeController.getTheme(req, res)
  )

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
