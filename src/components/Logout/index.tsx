import { useRequest } from 'ahooks'
import { useAuth } from 'hooks/useAuth'
import type React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const { user, refreshAsync } = useAuth()

  useRequest(
    async () => {
      if (user) {
        return Backend.auth.v1AuthLogoutCreate()
      }
      return {}
    },
    {
      onSuccess: () => {
        refreshAsync?.().then(() => {
          navigate('/login', { replace: true })
        })
      },
      onError: () => {
        console.log('logout error')
      }
    }
  )

  return user ? (
    <div>Logging out</div>
  ) : (
    <Navigate to='/login' replace />
  )
}

export default Index
