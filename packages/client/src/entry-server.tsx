import React from 'react'
import { renderToString } from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import routes from '@/routes/routes'
import createFetchRequest, { Request } from '@/helpers/request'
import { SvgSprite } from '@/components/ui/SvgSprite/SvgSprite'
import '@/scss/styles.scss'

export default async function renderHtml(req: Request) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context
  }
  const router = createStaticRouter(dataRoutes, context)
  return renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
      <SvgSprite url={'/sprite.symbol.svg'} />
    </React.StrictMode>
  )
}
