import axios from 'axios'

const host = import.meta.env.VITE_SERVER_HOST || 'http://localhost:3001'

console.log(`Local API: ${host}`)

const localApi = axios.create({
  baseURL: `${host}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default localApi
