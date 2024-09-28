import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import './PrivateLayout.scss';

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
