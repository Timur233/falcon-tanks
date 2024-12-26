import { SvgSprite } from '@/components/ui/SvgSprite/SvgSprite'
import createFetchRequest, { Request } from '@/helpers/request'
import routes from '@/routes/routes'
import '@/scss/styles.scss'
import { rootReducer } from '@/store/index'
import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { userService } from './services/userService'

export default async function renderHtml(req: Request) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  const store = configureStore({
    reducer: rootReducer,
  })

  userService.fetchUser(store.dispatch)

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  return {
    html: renderToString(
      <React.StrictMode>
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
          <SvgSprite url={'/sprite.symbol.svg'} />
        </Provider>
      </React.StrictMode>
    ),
    initialState: store.getState(),
  }
}
