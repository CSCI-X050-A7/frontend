import { ProtectedRoute } from 'components/ProtectedRoute'
import BookCreate from 'pages/BookCreate'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import NotFound from 'pages/NotFound'
import Register from 'pages/Register'
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
    path: '/register',
    element: <Register />
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
