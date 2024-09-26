// import { useEffect } from 'react'

import '@/app/App.scss'
import AuthLayout from '@/layouts/auth-layout'
import PrivateLayout from '@/layouts/private-layout'
import PublicLayout from '@/layouts/public-layout'
import RootLayout from '@/layouts/root-layout'
import { Error } from '@/pages/Error/Error'
import { Forum } from '@/pages/Forum/Forum'
import { Game } from '@/pages/Game/Game'
import { Leaderboard } from '@/pages/Leaderboard/Leaderboard'
import { Main } from '@/pages/Main/Main'
import { ChangePassword } from '@/pages/Profile/ChangePassword'
import { ProfileEdit } from '@/pages/Profile/Edit'
import { Profile } from '@/pages/Profile/Profile'
import { SignIn } from '@/pages/SignIn/SignIn'
import { SignUp } from '@/pages/SignUp/SignUp'
import { Thread } from '@/pages/Thread/Thread'
import '@/scss/styles.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const routerConfig = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        element: <PublicLayout />,
        children: [
          {
            index: true,
            element: <Main />,
          },
        ],
      },
      {
        element: <PrivateLayout />,
        children: [
          {
            path: '/game',
            element: <Game />,
          },
          {
            path: '/forum',
            element: <Forum />,
          },
          {
            path: '/forum/:threadId',
            element: <Thread />,
          },
          {
            path: '/leaderboard',
            element: <Leaderboard />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/profile/edit',
            element: <ProfileEdit />,
          },
          {
            path: '/profile/change-password',
            element: <ChangePassword />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/sign-in',
            element: <SignIn />,
          },
          {
            path: '/sign-up',
            element: <SignUp />,
          },
        ],
      },
    ],
  },
])

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }
  //
  //   fetchServerData()
  // }, [])
  //

  return (
    <div className={'app-layout'}>
      <RouterProvider router={routerConfig} />
    </div>
  )
}

export default App
