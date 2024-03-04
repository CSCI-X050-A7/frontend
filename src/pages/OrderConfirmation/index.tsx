import PageContainer from 'components/PageContainer'
import { Container, Row, Col } from 'react-bootstrap'

const OrderConfirmation: React.FC = () => {
  const userProfile = {
    email: 'example@email.com',
    movie: 'The Bee Movie',
    date: '3/3/21',
    location: 'MovieLand ATL'
  }

  return (
    <Container className='d-flex justify-content-center align-items-center mt-3'>
      <Row className='rounded p-3 border border-success'>
        <Col className='d-flex flex-column align-items-center'>
          <h1 className='mb-3'>🎉Congratulations!🎉</h1>
          <h4 className='mb-4'>We&apos;ve received your order!</h4>
          <p className='mb-4'>
            Look out for your confirmation email at{' '}
            <strong>{userProfile.email}</strong>
          </p>
          <h1 className='mb-3'>🖼️</h1>
          <h6 className='mb-3'>
            We can&apos;t wait to see you at{' '}
            <strong>{userProfile.location}</strong> for
            <strong>{userProfile.movie}</strong> on{' '}
            <strong>{userProfile.date}</strong>!
          </h6>
        </Col>
      </Row>
    </Container>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <OrderConfirmation />
  </PageContainer>
)

export default Index
