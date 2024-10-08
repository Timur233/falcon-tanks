import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import withAuthUser from '@/components/hoc/withAuthUser'
import './PrivateLayout.scss'

const PrivateLayout = (props: any & { userIsLogged: boolean }) => {
  const { userIsLogged } = props

  if (userIsLogged) {
    return (
      <div className="private-layout">
        <Header className="private-layout__header"></Header>
        <main className="private-layout__body">
          <Outlet />
        </main>
      </div>
    )
  }
  return <h1>Загрузка...</h1>
}
export default withAuthUser(PrivateLayout)
