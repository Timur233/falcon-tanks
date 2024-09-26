import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { RootState } from '@/store'
import { getUser, UserType } from '@/store/reducers/auth-reducer'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store'

export default function PrivateLayout() {
  // get user from store
  const user = useSelector<RootState, UserType>(state => state.AuthReducer.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // if user is empty call backend
    if (user === null) {
      dispatch(getUser())
    }
  }, [user])

  // if the user is full, show page
  return user === null ? <h1>Загрузка...</h1> : <Outlet />
}
