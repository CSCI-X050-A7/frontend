import { ProtectedRoute } from 'components/ProtectedRoute'
import BookCreate from 'pages/BookCreate'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import SignUp from 'pages/SignUp'
import type { RouteObject } from 'react-router-dom'

const children: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/',
    element: <Main />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/create',
        element: <BookCreate />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default children
