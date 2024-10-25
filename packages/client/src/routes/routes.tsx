import RootLayout from '@/layouts/RootLayout/RootLayout'
import { Error } from '@/pages/Error/Error'
import PublicLayout from '@/layouts/PublicLayout/PublicLayout'
import PrivateLayout from '@/layouts/PrivateLayout/PrivateLayout'
import { Main } from '@/pages/Main/Main'
import { Forum } from '@/pages/Forum/Forum'
import { Thread } from '@/pages/Thread/Thread'
import { CreateThread } from '@/pages/CreateThread/CreateThread'
import { Leaderboard } from '@/pages/Leaderboard/Leaderboard'
import { Profile } from '@/pages/Profile/Profile'
import { ChangePassword } from '@/pages/Profile/ChangePassword'
import AuthLayout from '@/layouts/AuthLayout/AuthLayout'
import { SignIn } from '@/pages/SignIn/SignIn'
import { SignUp } from '@/pages/SignUp/SignUp'
// import {Game} from "@/pages/Game/Game";
import { lazy } from 'react'

const Game = lazy(() =>
  import('@/pages/Game/Game').then(({ Game }) => ({ default: Game }))
)
const routes = [
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
            path: '/forum/new',
            element: <CreateThread />,
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
]

export default routes
