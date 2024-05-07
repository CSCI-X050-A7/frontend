import { useRequest } from 'ahooks'
import type { SchemaOrder } from 'client'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link, useSearchParams } from 'react-router-dom'
import Backend from 'utils/service'

const OrderSummary: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState<SchemaOrder>({
    booking_fee_price: 0,
    card_id: '',
    check_out: false,
    created_at: '',
    id: '',
    movie_title: '',
    promotion_id: '',
    promotion_price: 0,
    sales_tax_price: 0,
    show_id: '',
    ticket_price: 0,
    tickets: [],
    total_price: 0,
    user_id: ''
  })
  const { loading } = useRequest(
    async () => Backend.order.v1OrdersDetail(searchParams.get('order') ?? ''),
    {
      onSuccess: res => {
        setOrder(res.data)
      }
    }
  )
  return (
    <div className='d-flex flex-column align-items-center'>
      <h1 className='mb-3'>Order Summary</h1>
      {loading ? null : (
        <Card className='w-75 mb-3'>
          <Card.Body>
            <Card.Title>Order ID: {order.id}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              Movie: {order.movie_title}
            </Card.Subtitle>
            <Card.Text>
              <Row>
                <Col>
                  <h6>Fees:</h6>
                  <ul className='list-group'>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                      Booking Fee
                      <span>{order.booking_fee_price.toFixed(2)}</span>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                      Ticket Price
                      <span>{order.ticket_price.toFixed(2)}</span>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                      Sales Tax
                      <span>{order.sales_tax_price.toFixed(2)}</span>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                      Promotion Price
                      <span>{order.promotion_price.toFixed(2)}</span>
                    </li>
                    <li className='list-group-item d-flex justify-content-between align-items-center'>
                      <b>Total Price</b>
                      <span>
                        <b>{order.total_price.toFixed(2)}</b>
                      </span>
                    </li>
                  </ul>
                </Col>
                <Col>
                  <h6>Tickets:</h6>
                  <ul className='list-group'>
                    {order.tickets.map((ticket, index) => (
                      <li
                        key={index}
                        className='list-group-item d-flex justify-content-between align-items-center'
                      >
                        <div>Seat: {ticket.seat}</div>
                        <div>Type: {ticket.type}</div>
                      </li>
                    ))}
                  </ul>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      <Link to={`/order/checkout?order=${order.id}`}>
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
