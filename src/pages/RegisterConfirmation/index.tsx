import PageContainer from 'components/PageContainer'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <Alert variant='success'>
        <Alert.Heading>Registration Successful!</Alert.Heading>
        <p>
          Thank you for registering. A confirmation email has been sent to your
          email address. Please check your inbox and follow the instructions to
          complete your registration.
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button
            variant='outline-success'
            onClick={() => navigate('/login', { replace: true })}
          >
            Go to Login
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
