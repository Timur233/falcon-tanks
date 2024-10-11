import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import withAuthUser from '@/components/hoc/withAuthUser'
import './PrivateLayout.scss'

const PrivateLayout = () => {
  return (
    <div className="private-layout">
      <Header className="private-layout__header"></Header>
      <main className="private-layout__body">
        <Outlet />
      </main>
    </div>
  )
}
export default withAuthUser(PrivateLayout)
