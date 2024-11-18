import App from '@/app/App'
import { store } from '@/store'
import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import '@/scss/styles.scss'
import { registerServiceWorker } from './registerServiceWorker'

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker()
}
