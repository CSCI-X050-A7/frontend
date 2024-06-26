import { ProtectedRoute } from 'components/ProtectedRoute'
import Activate from 'pages/Activate'
import Admin from 'pages/Admin'
import ChangePassword from 'pages/ChangePassword'
import Checkout from 'pages/Checkout'
import EditProfile from 'pages/EditProfile'
import ForgotPassword from 'pages/ForgotPassword'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieManage from 'pages/MovieManage'
import MovieSeatSelect from 'pages/MovieSeatSelect'
import MovieSelect from 'pages/MovieSelect'
import NotFound from 'pages/NotFound'
import OrderConfirmation from 'pages/OrderConfirmation'
import OrderHistory from 'pages/OrderHistory'
import OrderSummary from 'pages/OrderSummary'
import PromoManage from 'pages/PromoManage'
import Register from 'pages/Register'
import RegisterConfirmation from 'pages/RegisterConfirmation'
import ResetPassword from 'pages/ResetPassword'
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
    path: '/forgotPassword',
    element: <ForgotPassword />
  },
  {
    path: '/resetPassword',
    element: <ResetPassword />
  },
  {
    path: '/activate',
    element: <Activate />
  },
  {
    path: '/register/confirm',
    element: <RegisterConfirmation />
  },
  {
    path: '/',
    element: <Main />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/admin/movie',
        element: <MovieManage />
      },
      {
        path: '/admin/user',
        element: <UserManage />
      },
      {
        path: '/admin/promo',
        element: <PromoManage />
      },
      {
        path: '/profile/edit',
        element: <EditProfile />
      },
      {
        path: '/profile/orders',
        element: <OrderHistory />
      },
      {
        path: '/changePassword',
        element: <ChangePassword />
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
        path: '/order/confirm',
        element: <OrderConfirmation />
      },
      {
        path: '/order/summary',
        element: <OrderSummary />
      },
      { path: '/order/checkout', element: <Checkout /> }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]

export default children
