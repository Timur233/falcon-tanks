import { Header } from '@/components/common/Header/Header'
import withAuthUser from '@/components/hoc/withAuthUser'
import { Loader } from '@/components/ui/Loader/Loader'
import { RootState, useAppDispatch } from '@/store'
import { actions, getUser, UserType } from '@/store/reducers/auth-reducer'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './PrivateLayout.scss'

export function PrivateLayout() {
  const user = useSelector<RootState, UserType>(state => state.authReducer.user)
  const navigate = useNavigate()
  const [isLogged, setIsLogged] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsLogged(window.sessionStorage.getItem('userIsLogged') === '1')

    if (!isLogged) {
      dispatch(getUser())
        .unwrap()
        .then(data => {
          dispatch(actions.setUser(data))
          window.sessionStorage.setItem('userIsLogged', '1') // 0
          window.sessionStorage.setItem('userId', data.id.toString())
        })
        .catch(() => {
          window.sessionStorage.setItem('userIsLogged', '0') // 0
          window.sessionStorage.setItem('userId', '')

          toast.error('Необходимо авторизоваться', {
            autoClose: 1500,
            onClose: () => {
              navigate('/sign-in')
            },
          })
        })
    }
  }, [dispatch, navigate, isLogged, setIsLogged])

  if (isLogged) {
    return (
      <div className="private-layout">
        <Header className="private-layout__header"></Header>
        <main className="private-layout__body">
          <Outlet />
        </main>
      </div>
    )
  }

  return user === null ? <Loader show={true} /> : <Outlet />
}

export default withAuthUser(PrivateLayout)
