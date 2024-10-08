import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from '@/layouts/RootLayout/RootLayout'
import PrivateLayout from '@/layouts/PrivateLayout/PrivateLayout'
import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import PublicLayout from '@/layouts/PublicLayout/PublicLayout'
import { Error } from '@/pages/Error/Error'
import { Forum } from '@/pages/Forum/Forum'
import { Leaderboard } from '@/pages/Leaderboard/Leaderboard'
import { Main } from '@/pages/Main/Main'
import { SignIn } from '@/pages/SignIn/SignIn'
import { SignUp } from '@/pages/SignUp/SignUp'
import { Game } from '@/pages/Game/Game'
import { Thread } from '@/pages/Thread/Thread'
import { Profile } from '@/pages/Profile/Profile'
import { ChangePassword } from '@/pages/Profile/ChangePassword'
import { SvgSprite } from '@/components/ui/SvgSprite/SvgSprite'

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
  return (
    <>
      <RouterProvider router={routerConfig} />
      <SvgSprite url={'/sprite.symbol.svg'} />
    </>
  )
}

export default App
