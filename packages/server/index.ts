import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { createClientAndConnect } from './db'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import dotenv from 'dotenv'
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
    const url = req.originalUrl
    try {
      // Создаём переменные
      let renderHtmlModule: Record<string, any>
      let template: string

      if (vite) {
        template = fs.readFileSync(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite?.transformIndexHtml(url, template)
        // Загружаем модуль клиента, он будет рендерить HTML-код
        renderHtmlModule = await vite?.ssrLoadModule(
          path.join(clientPath, '/src/entry-server.tsx')
        )
      } else {
        template = fs.readFileSync(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Получаем путь до собранного модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.cjs'
        )

        // Импортируем этот модуль и вызываем с инишиал стейтом
        renderHtmlModule = await import(pathToServer)
      }
      // Получаем HTML-строку из JSX
      const appHtml = await renderHtmlModule.default(req)
      // Заменяем комментарий на сгенерированную HTML-строку

      const html = template?.replace('<!--ssr-outlet-->', appHtml)
      // Завершаем запрос и отдаём HTML-страницу
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
