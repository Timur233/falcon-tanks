import { Header } from '@/components/common/Header/Header'
import { Outlet } from 'react-router-dom'
import './PublicLayout.scss'

export default function PublicLayout() {
  return (
    <div className="public-layout">
      <Header className="public-layout__header"></Header>
      <main className="public-layout__body">
        <Outlet />
      </main>
    </div>
  )
}
