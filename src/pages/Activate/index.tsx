import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Backend from 'utils/service'

const Activate: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const code = searchParams.get('code') ?? ''
  const { loading } = useRequest(
    async () =>
      Backend.auth.v1AuthActivateCreate({
        id,
        code
      }),
    {
      onSuccess: () => {
        navigate('/')
      },
      onError: () => {
        navigate('/register')
      }
    }
  )
  return (
    <div className='text-center'>
      <h1>{loading ? 'Loading' : 'Redirecting'}</h1>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <Activate />
  </PageContainer>
)

export default Index
