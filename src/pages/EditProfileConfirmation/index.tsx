import PageContainer from 'components/PageContainer'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const navigate = useNavigate()
  return (
    <div className='container'>
      <Alert variant='success'>
        <Alert.Heading>Edit Successful!</Alert.Heading>
        <p>
          User information has been updated successfully.
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button
            variant='outline-success'
            onClick={() => navigate('', { replace: true })}
          >
            Go to Main Page
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
