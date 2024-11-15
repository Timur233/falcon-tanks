import { store } from '@/store'
import { actions, getUser } from '@/store/reducers/auth-reducer'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { NavigateFunction } from 'react-router-dom'
import { toast } from 'react-toastify'

const BASE_URL = import.meta.env.VITE_AUTH_URL
const REDIRECT_URI = 'http://localhost:3000'
const YANDEX_AUTH_LINK = 'https://oauth.yandex.ru/authorize'

export class YandexOAuth {
  /**
   * Получаю serviceID
   * Делаю редирект на страницу авторизации Yandex
   */
  static async redirect() {
    try {
      const getServiceID = await axios({
        method: 'get',
        url: `${BASE_URL}/oauth/yandex/service-id`,
        responseType: 'json',
        params: {
          redirect_uri: REDIRECT_URI,
        },
      })

      if (getServiceID.status === 200 && getServiceID.data?.service_id) {
        const serviceId = getServiceID.data.service_id
        const yandexRedirectLink = `${YANDEX_AUTH_LINK}?response_type=code&client_id=${serviceId}&redirect_uri=${REDIRECT_URI}`

        window.open(yandexRedirectLink, '_self')

        return
      }

      throw new Error('Get service ID error')
    } catch {
      toast.error('Сервис временно не доступен', {
        autoClose: 1500,
      })
    }
  }

  /**
   * Если в адресе страницы присутствуют code и cid
   * Авторизую пользователя через сервис
   * Запрашиваю данные пользователя
   * Отправляю на главную страницу
   */
  static async signIn(navigate: NavigateFunction) {
    const params = YandexOAuth.getDocumentParams()

    if (!!params.code && !!params.cid) {
      let signInResponse: AxiosResponse | undefined

      await axios({
        method: 'post',
        url: `${BASE_URL}/oauth/yandex`,
        responseType: 'json',
        withCredentials: true,
        data: {
          code: params.code,
          redirect_uri: REDIRECT_URI,
        },
      })
        .then((res: AxiosResponse) => (signInResponse = res))
        .catch((error: AxiosError) => {
          if (error?.response) {
            signInResponse = error.response
          }
        })

      if (
        signInResponse &&
        (signInResponse.status === 200 || signInResponse.status === 400)
      ) {
        YandexOAuth.getUserData()
          .then(() => {
            navigate('/')
          })
          .catch(() => {
            navigate('/sign-in')
            toast.error('Не удалось получить данные пользователя', {
              autoClose: 1500,
            })
          })

        return
      }

      toast.error('Сервис временно не доступен', {
        autoClose: 1500,
      })

      navigate('/sign-in')
    }
  }

  static getDocumentParams() {
    const urlParams = new URLSearchParams(document.location.search)

    return {
      code: urlParams.get('code') || null,
      cid: urlParams.get('cid') || null,
    }
  }

  /**
   * Подтягиваю данные пользователя
   * Через store.actions
   */
  static getUserData() {
    return store
      .dispatch(getUser())
      .unwrap()
      .then(data => {
        store.dispatch(actions.setUser(data))

        window.sessionStorage.setItem('userIsLogged', '1')
      })
      .catch(() => {
        window.sessionStorage.setItem('userIsLogged', '0')
      })
  }
}
