import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'

export default function PrivateLayout() {
  return (
    <div className="private-layout">
      <Header className="private-layout__header"></Header>
      <main className="private-layout__body">
        <Outlet />
      </main>
    </div>
  )
}
