import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { getUser, UserType } from '@/store/reducers/auth-reducer'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store'

export default function PrivateLayout() {
  const user = useSelector<RootState, UserType>(state => state.AuthReducer.user)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if (user === null) {
      dispatch(getUser())
    }
  }, [user])

  if (user === null) return <h1>Загрузка...</h1>

  return (
    <div className="private-layout">
      <Header className="private-layout__header"></Header>
      <main className="private-layout__body">
        <Outlet />
      </main>
    </div>
  )
}
