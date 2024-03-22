import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { Button } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Backend from 'utils/service'

const Activate: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id') ?? ''
  const code = searchParams.get('code') ?? ''

  const activate = useRequest(
    async () =>
      Backend.auth.v1AuthActivateCreate({
        id,
        code
      }),
    {
      manual: true,
      onSuccess: () => {
        navigate('/')
      },
      onError: () => {
        navigate('/register')
      }
    }
  )

  const handleButton = () => {
    activate.run()
  }

  return (
    <div className='text-center'>
      <h1>Confirm your account</h1>
      <Button variant='outline-success' onClick={handleButton}>
        Confirm
      </Button>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <Activate />
  </PageContainer>
)

export default Index
