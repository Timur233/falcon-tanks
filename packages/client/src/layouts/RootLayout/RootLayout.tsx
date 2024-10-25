import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout() {
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}
