import { ProtectedRoute } from 'components/ProtectedRoute'
import Checkout from 'pages/Checkout'
import EditProfile from 'pages/EditProfile'
import Admin from 'pages/Admin'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieCreate from 'pages/MovieCreate'
import MovieSeatSelect from 'pages/MovieSeatSelect'
import MovieSelect from 'pages/MovieSelect'
import MovieManage from 'pages/MovieManage'
import NotFound from 'pages/NotFound'
import OrderConfirmation from 'pages/OrderConfirmation'
import OrderSummary from 'pages/OrderSummary'
import PromoManage from 'pages/PromoManage'
import Register from 'pages/Register'
import RegisterConfirm from 'pages/RegisterConfirm'
import UserManage from 'pages/UserManage'
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
    path: '/profile/edit',
    element: <EditProfile />
  },
  {
    path: '/register/confirm',
    element: <RegisterConfirm />
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        path: '/movies',
        element: <MovieManage />
      },
      {
        path: '/users',
        element: <UserManage />
      },
      {
        path: '/promos',
        element: <PromoManage />
      }
    ]
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
    path: '/movie/:movieId/book',
    element: <MovieSelect />
  },

  {
    path: '/movie/:movieId/seat',
    element: <MovieSeatSelect />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: '/order/confirmation',
    element: <OrderConfirmation />
  },
  {
    path: '/order/summary',
    element: <OrderSummary />
  },
  { path: '/order/checkout', element: <Checkout /> }
]

export default children
