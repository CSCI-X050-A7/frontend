import PageContainer from 'components/PageContainer'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const OrderSummary: React.FC = () => {
  const userProfile = {
    movie: 'The Bee Movie',
    date: '3/3/21',
    time: '3:00pm',
    TotalPrice: '$21.00',
    adultTickets: '12.00',
    numAdultTickets: '1',
    childTickets: '$4.50',
    numChildTickets: '2',
    seats: 'A1, A2'
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ marginBottom: '30px' }}> Order Summary</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div>
          {' '}
          {/* TICKET DETAILS */}
          <h4 style={{ marginBottom: '20px' }}> Seat Details</h4>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Seat(s): <strong>{userProfile.seats}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}> Ticket(s): </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Adult Tickets: <strong>{userProfile.numAdultTickets}</strong>x{' '}
            <strong>{userProfile.adultTickets}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Child Tickets: <strong>{userProfile.numChildTickets}</strong>x{' '}
            <strong>{userProfile.childTickets}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Total Cost: <strong>{userProfile.TotalPrice}</strong>{' '}
          </p>
          <div style={{ width: '600px' }}>
            {' '}
            {/* Horizontal spacer */}
            {/* THIS IS A SPACER */}
          </div>
        </div>
        <div>
          {' '}
          {/* MOVIE DETAILS */}
          <h4 style={{ marginBottom: '40px', display: 'block' }}>
            {' '}
            Movie Details
          </h4>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Movie: <strong>{userProfile.movie}</strong>
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Time: <strong>{userProfile.date}</strong> at{' '}
            <strong>{userProfile.time}</strong>
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Movie: <strong>{userProfile.movie}</strong>
          </p>
        </div>
      </div>

      <Button variant='success' type='submit' style={{ marginBottom: '20px' }}>
        Edit Details ✎
      </Button>

      <Link to='/order/checkout'>
        <Button variant='primary' type='submit'>
          Checkout
        </Button>
      </Link>
    </div>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <OrderSummary />
  </PageContainer>
)

export default Index
