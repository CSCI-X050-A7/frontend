import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

interface UserProfile {
  movie: string
  date: string
  time: string
  TotalPrice: string
  adultTickets: string
  numAdultTickets: string
  childTickets: string
  numChildTickets: string
  location: string
  seats: string
}

const OrderSummary: React.FC = () => {
  const [userProfile] = useState<UserProfile>({
    movie: 'The Bee Movie',
    date: '3/3/21',
    time: '3:00pm',
    TotalPrice: '$21.00',
    adultTickets: '12.00',
    numAdultTickets: '1',
    childTickets: '$4.50',
    numChildTickets: '2',
    location: 'MovieLand ATL',
    seats: 'A1, A2'
  })

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
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Seat(s): <strong>{userProfile.seats}</strong>{' '}
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Ticket(s):{' '}
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Adult Tickets: <strong>{userProfile.numAdultTickets}</strong>x{' '}
            <strong>{userProfile.adultTickets}</strong>{' '}
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Child Tickets: <strong>{userProfile.numChildTickets}</strong>x{' '}
            <strong>{userProfile.childTickets}</strong>{' '}
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Total Cost: <strong>{userProfile.TotalPrice}</strong>{' '}
          </label>
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
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Movie: <strong>{userProfile.movie}</strong>
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Time: <strong>{userProfile.date}</strong> at{' '}
            <strong>{userProfile.time}</strong>
          </label>
          <label style={{ marginBottom: '20px', display: 'block' }}>
            {' '}
            Movie: <strong>{userProfile.movie}</strong>
          </label>
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
