import { Header } from '@/components/common/Header/Header'
import {Outlet, useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "@/store";
import {actions, getUser, UserType} from "@/store/reducers/auth-reducer";
import {useEffect} from "react";
import {toast} from "react-toastify";

export default function PrivateLayout() {
  const user = useSelector<RootState, UserType>(state => state.authReducer.user)
  const navigate = useNavigate()
  const userIsLogged = window.sessionStorage.getItem('userIsLogged') === '1'
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!userIsLogged) {
      dispatch(getUser())
        .unwrap()
        .then(data => {
          dispatch(actions.setUser(data))
          window.sessionStorage.setItem('userIsLogged', '1') // 0
        })
        .catch(() => {
          window.sessionStorage.setItem('userIsLogged', '0') // 0

          toast.error('Необходимо авторизоваться', {
            autoClose: 1500,
            onClose: () => {
              navigate('/sign-in')
            },
          })
        })
    }
  }, [])

  // useEffect(() => {
    // console.log(user)
  // }, [user])

  if (userIsLogged) {
    return (
      <div className="private-layout">
        <Header className="private-layout__header"></Header>
        <main className="private-layout__body">
          <Outlet/>
        </main>
      </div>
    )
  }
  return user === null ? <h1>Загрузка...</h1> : <Outlet />

}
