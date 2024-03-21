// import { ProtectedRoute } from 'components/ProtectedRoute'
import Activate from 'pages/Activate'
import Checkout from 'pages/Checkout'
import EditProfile from 'pages/EditProfile'
import Login from 'pages/Login'
import Logout from 'pages/Logout'
import Main from 'pages/Main'
import MovieManage from 'pages/MovieManage'
import MovieSeatSelect from 'pages/MovieSeatSelect'
import MovieSelect from 'pages/MovieSelect'
import NotFound from 'pages/NotFound'
import OrderConfirmation from 'pages/OrderConfirmation'
import OrderSummary from 'pages/OrderSummary'
import PromoManage from 'pages/PromoManage'
import Register from 'pages/Register'
import RegisterConfirmation from 'pages/RegisterConfirmation'
import UserManage from 'pages/UserManage'
import EditProfileConfirmation from 'pages/EditProfileConfirmation'
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
    path: '/activate',
    element: <Activate />
  },
  {
    path: '/profile/edit',
    element: <EditProfile />
  },
  {
    path: '/edit/confirmation',
    element: <EditProfileConfirmation />
  },
  {
    path: '/register/confirm',
    element: <RegisterConfirmation />
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
    path: '/',
    element: <Main />
  },
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  //     {
  //       path: '/create',
  //       element: <MovieCreate />
  //     }
  //   ]
  // },
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
    path: '/order/confirm',
    element: <OrderConfirmation />
  },
  {
    path: '/order/summary',
    element: <OrderSummary />
  },
  { path: '/order/checkout', element: <Checkout /> }
]

export default children
