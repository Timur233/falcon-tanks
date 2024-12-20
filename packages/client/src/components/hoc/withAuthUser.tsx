import { userService } from '@/services/userService'
import { RootState, useAppDispatch } from '@/store'
import { UserType } from '@/store/reducers/auth-reducer'
import { ComponentType, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Loader } from '../ui/Loader/Loader'
import { getTheme } from '@/store/reducers/theme-reducer'

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
    const isAuthPath = '/sign-in, /sign-up'.split(', ').includes(pathname)

    const handleAuthentication = async () => {
      const isAuthenticated = await userService.fetchUser(dispatch)

      dispatch(getTheme())

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

    return <Loader show={true} />
  }
}
