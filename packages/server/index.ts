import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
dotenv.config()

import express from 'express'
// import { createClientAndConnect } from './db'

const startServer = () => {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  // createClientAndConnect()

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  app.use('*', async (_, res) => {
    global.window = {} as Window & typeof globalThis
    ;(global.Image as unknown) = class {
      constructor() {
        // Добавьте любую необходимую реализацию или оставьте пустой класс
      }
    }
    global.document = {} as Document

    const distPath = path.dirname(
      require.resolve('falcon-tanks/dist/index.html')
    )

    const ssrClientPath = require.resolve(
      'falcon-tanks/ssr-dist/falcon-tanks.cjs'
    )

    try {
      const template = fs.readFileSync(
        path.resolve(distPath, 'index.html'),
        'utf-8'
      )
      const { render } = await import(ssrClientPath)
      const appHtml = await render()
      const html = template.replace('<!--ssr-outlet-->', appHtml)
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      console.log('error in try catch: ', e)
      // vite.ssrFixStacktrace(e)
      // next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

console.log('start')
startServer()
