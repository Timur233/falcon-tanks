import axios, { AxiosError, AxiosResponse } from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  function (error: AxiosError) {
    // if app get response code 401 (died token), redirect user to sign-in form
    if (error.response?.status === 401) {
      localStorage.removeItem('user')
      // save page where we get 401 and redirect after login
      window.location.href = '/sign-in?redirectUrl=' + window.location.pathname
    }

    if (axios.isCancel(error)) return Promise.reject(error)

    return Promise.reject(error)
  }
)

export default instance
