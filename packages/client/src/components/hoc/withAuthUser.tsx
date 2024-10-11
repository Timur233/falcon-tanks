import { ComponentType, useEffect } from 'react'
import { UserType } from '@/store/reducers/auth-reducer'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { RootState, useAppDispatch } from '@/store'
import { useSelector } from 'react-redux'
import { userService } from '@/services/userService'

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
    const userIsLogged = userService.isLoggedIn()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const isAuthPath = import.meta.env.VITE_AUTH_PATHNAMES.split(', ').includes(
      pathname
    )

    const handleAuthentication = async () => {
      const isAuthenticated = await userService.fetchUser(dispatch)

      if (!isAuthenticated && !isAuthPath) {
        toast.error('Необходимо авторизоваться', { autoClose: 1500 })
        navigate('/sign-in')
      }
    }

    useEffect(() => {
      if (!userIsLogged || user === null) {
        handleAuthentication()
      } else if (redirectTo) {
        toast.success('Вы уже авторизованы', { autoClose: 1500 })
        navigate(redirectTo)
      }
    }, [user, userIsLogged])

    if (userIsLogged || isAuthPath) {
      return <Component {...props} userIsLogged={userIsLogged} user={user} />
    }

    return <h1>Загрузка...</h1>
  }
}
