import { ProtectedRoute } from 'components/ProtectedRoute'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieCreate from 'pages/MovieCreate'
import NotFound from 'pages/NotFound'
import Register from 'pages/Register'
import RegisterConfirm from 'pages/RegisterConfirm'
import SelectMovie from 'pages/SelectMovie'
import SelectSeat from 'pages/SelectSeat'
import SelectTime from 'pages/SelectTime'
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
    path: '/register/confirm',
    element: <RegisterConfirm />
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
        element: <MovieCreate />
      }
    ]
  },
  {
    path: '/SelectMovie',
    element: <SelectMovie />
  },
  {
    path: '/SelectTime',
    element: <SelectTime />
  },
  {
    path: '/SelectSeat',
    element: <SelectSeat />
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default children
