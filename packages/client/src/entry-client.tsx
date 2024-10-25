import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { registerServiceWorker } from './registerServiceWorker'
import App from '@/app/App'

import '@/scss/styles.scss'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

registerServiceWorker()
