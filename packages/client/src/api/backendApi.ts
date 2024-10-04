import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default instance
