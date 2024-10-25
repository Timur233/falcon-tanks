import '@/scss/styles.scss'
import { store } from '@/store'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './app/App'
import { registerServiceWorker } from './registerServiceWorker'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)

registerServiceWorker()
