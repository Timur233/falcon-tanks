import { SvgSprite } from '@/components/ui/SvgSprite/SvgSprite'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import routes from '@/routes/routes'

export default function App() {
  const router = createBrowserRouter(routes)

  return (
    <>
      <RouterProvider router={router} />
      <SvgSprite url={'/sprite.symbol.svg'} />
    </>
  )
}
