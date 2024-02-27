import { ProtectedRoute } from 'components/ProtectedRoute'
import Checkout from 'pages/Checkout'
import EditProfile from 'pages/EditProfile'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieCreate from 'pages/MovieCreate'
import NotFound from 'pages/NotFound'
import OrderConfirmation from 'pages/OrderConfirmation'
import OrderSummary from 'pages/OrderSummary'
import Register from 'pages/Register'
import RegisterConfirm from 'pages/RegisterConfirm'
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
    path: '/editProfile',
    element: <EditProfile />
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
    path: '*',
    element: <NotFound />
  },
  {
    path: '/OrderConfirmation',
    element: <OrderConfirmation />
  },
  {
    path: '/OrderSummary',
    element: <OrderSummary />
  },
  { path: '/Checkout', element: <Checkout /> }
]

export default children
