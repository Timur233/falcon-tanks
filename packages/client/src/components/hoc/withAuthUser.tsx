import { ComponentType, useEffect } from 'react'
import { actions, getUser, UserType } from '@/store/reducers/auth-reducer'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'

type WithAuthUserProps = {
  userIsLogged: boolean
  user: UserType | null
}

export default function withAuthUser<P extends object>(
  Component: ComponentType<P & WithAuthUserProps>,
  redirectTo?: string
) {
  return function WrappedWithAuthUser(props: P) {
    const user = useSelector<RootState, UserType>(
      state => state.authReducer.user
    )
    const userIsLogged = window.sessionStorage.getItem('userIsLogged') === '1'
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation()
    const { pathname } = location

    const successAuth = (redirectTo: string) => {
      toast.success('Вы уже авторизованы')
      navigate(redirectTo)
    }

    useEffect(() => {
      if (!userIsLogged || user === null) {
        dispatch(getUser())
          .unwrap()
          .then(data => {
            dispatch(actions.setUser(data))
            window.sessionStorage.setItem('userIsLogged', '1') // 0

            if (redirectTo) {
              successAuth(redirectTo)
            }
          })
          .catch(() => {
            window.sessionStorage.setItem('userIsLogged', '0') // 1

            if (!['/sign-in', '/sign-up'].includes(pathname)) {
              toast.error('Необходимо авторизоваться')
              navigate('/sign-in')
            }
          })
      } else if (redirectTo) {
        successAuth(redirectTo)
      }
    }, [user, userIsLogged])

    return <Component {...props} userIsLogged={userIsLogged} user={user} />
  }
}
