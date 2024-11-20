import { RootState } from '@/store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout() {
  const themeAlias = useSelector<RootState, string>(
    state => state.themeReducer.themeAlias
  )

  useEffect(() => {
    document.body.classList.add('custom-theme__' + themeAlias)
  })

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}
