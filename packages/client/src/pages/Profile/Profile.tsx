import { logoutUser } from '@/store/reducers/user-reducer'
import { useAppDispatch } from '@/store'

export const Profile = () => {
  const dispatch = useAppDispatch()

  return (
    <>
      Страница профиля
      <button onClick={() => dispatch(logoutUser())}>Выйти</button>
    </>
  )
}
