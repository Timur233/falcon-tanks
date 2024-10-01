import { logoutUser } from '@/store/reducers/auth-reducer'
import { useAppDispatch } from '@/store'
import { useNavigate } from 'react-router-dom'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onLogoutUser = () => {
    dispatch(logoutUser()).then(() => {
      window.sessionStorage.setItem('userIsLogged', '0') // 0
      navigate('/')
    })
  }
  return (
    <>
      Страница профиля
      <button onClick={() => onLogoutUser()}>Выйти</button>
    </>
  )
}
