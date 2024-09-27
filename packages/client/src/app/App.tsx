// import { useEffect } from 'react'

import '@/app/App.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '@/layouts/root-layout'
import PrivateLayout from '@/layouts/private-layout'
import AuthLayout from '@/layouts/auth-layout'
import PublicLayout from '@/layouts/public-layout'
import { Main } from '@/pages/Main/Main'
import { SignIn } from '@/pages/SignIn/SignIn'
import { SignUp } from '@/pages/SignUp/SignUp'
import { Game } from '@/pages/Game/Game'
import { Forum } from '@/pages/Forum/Forum'
import { Error } from '@/pages/Error/Error'
import { Thread } from '@/pages/Thread/Thread'
import { Leaderboard } from '@/pages/Leaderboard/Leaderboard'
import { Profile } from '@/pages/Profile/Profile'
import { ProfileEdit } from '@/pages/Profile/Edit'
import { ChangePassword } from '@/pages/Profile/ChangePassword'

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
  return <RouterProvider router={routerConfig} />
}

export default App
