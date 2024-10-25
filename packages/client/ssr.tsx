import ReactDOM from 'react-dom/server'
import App from './src/app/App'
import './src/scss/styles.scss'

export const render = () => ReactDOM.renderToString(<App />)
