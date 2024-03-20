import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import type React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const Logout: React.FC = () => {
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
      onError: () => {}
    }
  )

  return user ? <div>Logging out</div> : <Navigate to='/login' replace />
}

const Index: React.FC = () => (
  <PageContainer>
    <Logout />
  </PageContainer>
)

export default Index
