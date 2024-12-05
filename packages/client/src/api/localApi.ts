import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.SERVER_PORT || 3000
const host = process.env.SERVER_HOST || 'http://localhost'

console.log(`Local API: ${host}:${port}`)

const localApi = axios.create({
  baseURL: `${host}:${port}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default localApi
