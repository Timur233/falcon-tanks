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
    const bodyEl = document?.body
    const bodyClassname = bodyEl?.getAttribute('class') || ''

    if (typeof bodyClassname === 'string') {
      const classListString = bodyClassname
        .replace(/\bcustom-theme__\S*/g, '')
        .replace(/\btypescript\b/g, '')
        .trim()

      bodyEl.setAttribute(
        'class',
        `${classListString} custom-theme__${themeAlias}`
      )
    }
  })

  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  )
}
