import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store'
import { actions, getUser, UserType } from '@/store/reducers/auth-reducer'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export default function AuthLayout() {
  const user = useSelector<RootState, UserType>(state => state.AuthReducer.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (window.sessionStorage.getItem('userIsLogged') === '1') {
      toast.success('Вы уже авторизованы', {
        autoClose: 1500,
        onClose: () => {
          navigate('/game')
        },
      })
    }
  }, [user])

  return <Outlet />
}
