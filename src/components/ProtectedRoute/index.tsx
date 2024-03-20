import { useAuth } from 'hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { user } = useAuth()
  const location = useLocation()

  // Check if the user is authenticated
  if (!user) {
    // If not authenticated, redirect to the login page
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  // If authenticated, render the child routes
  return <Outlet />
}
