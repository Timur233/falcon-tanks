import { Outlet } from 'react-router-dom'
import withAuthUser from '@/components/hoc/withAuthUser'

const AuthLayout = () => {
  return <Outlet />
}

export default withAuthUser(AuthLayout, '/game')
