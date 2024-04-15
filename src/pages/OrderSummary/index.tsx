import PageContainer from 'components/PageContainer'
import Button from 'react-bootstrap/Button'
import { Link, useLocation } from 'react-router-dom'

const OrderSummary: React.FC = () => {
  // TODO: transfer state to order
  const location = useLocation()
  const state = location.state as unknown[]
  const order = {
    movie: 'The Bee Movie',
    date: '3/3/21',
    time: '3:00pm',
    TotalPrice: '$21.00',
    adultTickets: '12.00',
    numAdultTickets: state.length,
    childTickets: '$4.50',
    numChildTickets: state.length,
    seats: 'A1, A2'
  }
  // console.log(state)

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
            Seat(s): <strong>{order.seats}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}> Ticket(s): </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Adult Tickets: <strong>{order.numAdultTickets}</strong>x{' '}
            <strong>{order.adultTickets}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Child Tickets: <strong>{order.numChildTickets}</strong>x{' '}
            <strong>{order.childTickets}</strong>{' '}
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Total Cost: <strong>{order.TotalPrice}</strong>{' '}
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
            Movie: <strong>{order.movie}</strong>
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Time: <strong>{order.date}</strong> at <strong>{order.time}</strong>
          </p>
          <p style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Movie: <strong>{order.movie}</strong>
          </p>
        </div>
      </div>

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
