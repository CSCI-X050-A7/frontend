import { ProtectedRoute } from 'components/ProtectedRoute'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieCreate from 'pages/MovieManage'
import NotFound from 'pages/NotFound'
import Register from 'pages/Register'
import RegisterConfirm from 'pages/RegisterConfirm'
import SelectMovie from 'pages/MovieSelect'
import SelectSeat from 'pages/MovieSeatSelect'
import type { RouteObject } from 'react-router-dom'
import ChangePasswordForm from 'pages/ChangePasswordForm'

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
    path: '/SelectSeat',
    element: <SelectSeat />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/ChangePasswordForm',
    element: <ChangePasswordForm />
  }

]

export default children
