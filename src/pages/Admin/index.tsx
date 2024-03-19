import PageContainer from 'components/PageContainer'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <Alert variant='success'>
        <Alert.Heading>Admin</Alert.Heading>
        <p>Admin</p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button
            variant='outline-success'
            onClick={() => navigate('/movie', { replace: true })}
          >
            Manage movies
          </Button>
          <Button
            variant='outline-success'
            onClick={() => navigate('/user', { replace: true })}
          >
            Manage users
          </Button>
          <Button
            variant='outline-success'
            onClick={() => navigate('/promo', { replace: true })}
          >
            Manage promos
          </Button>
        </div>
      </Alert>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <Confirmation />
  </PageContainer>
)

export default Index
