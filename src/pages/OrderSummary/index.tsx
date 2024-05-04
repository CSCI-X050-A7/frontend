import PageContainer from 'components/PageContainer'
import { Row, Col } from 'react-bootstrap'
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

  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='mb-3'>Order Summary</h1>
      <Row className='w-75'>
        <Col>
          <h4 className='mb-4'>Seat Details</h4>
          <p className='mb-2'>
            Seat(s): <strong>{order.seats}</strong>
          </p>
          <p className='mb-2'>Ticket(s):</p>
          <ul>
            <li className='mb-2'>
              Adult Tickets: <strong>{order.numAdultTickets}</strong>x{' '}
              <strong>{order.adultTickets}</strong>
            </li>
            <li className='mb-2'>
              Child Tickets: <strong>{order.numChildTickets}</strong>x{' '}
              <strong>{order.childTickets}</strong>
            </li>
          </ul>
          <p className='mb-2'>
            Total Cost: <strong>{order.TotalPrice}</strong>
          </p>
        </Col>
        <Col>
          <h4 className='mb-4'>Movie Details</h4>
          <p className='mb-2'>
            Movie: <strong>{order.movie}</strong>
          </p>
          <p className='mb-2'>
            Time: <strong>{order.date}</strong> at <strong>{order.time}</strong>
          </p>
          <p className='mb-2'>
            Movie: <strong>{order.movie}</strong>
          </p>
        </Col>
      </Row>
      <Link to='/order/checkout'>
        <Button variant='primary' type='submit' className='mt-3'>
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
