import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import PrivateLayout from '@/layouts/PrivateLayout/PrivateLayout'
import PublicLayout from '@/layouts/PublicLayout/PublicLayout'
import RootLayout from '@/layouts/RootLayout/RootLayout'
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
  return <RouterProvider router={routerConfig} />
}

export default App
