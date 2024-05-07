import { useRequest } from 'ahooks'
import type { SchemaShow, SchemaOrder } from 'client'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link, useSearchParams } from 'react-router-dom'
import Backend from 'utils/service'

const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { user } = useAuth()
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
  const [show, setShow] = useState<SchemaShow>({
    adult_ticket_price: 0,
    booking_fee: 0,
    child_ticket_price: 0,
    end_time: '',
    id: '',
    movie_id: '',
    senior_ticket_price: 0,
    start_time: '',
    theater_location: ''
  })
  const { loading: loadingShow, run: loadShow } = useRequest(
    async () => Backend.show.v1ShowsDetail(order.show_id),
    {
      onSuccess: res => {
        setShow(res.data)
      },
      manual: true
    }
  )
  const { loading: loadingOrder } = useRequest(
    async () => Backend.order.v1OrdersDetail(searchParams.get('order') ?? ''),
    {
      onSuccess: res => {
        setOrder(res.data)
        loadShow()
      }
    }
  )

  return (
    <Container className='d-flex justify-content-center align-items-center mt-3'>
      <Row className='rounded p-3 border border-success'>
        <Col className='d-flex flex-column align-items-center'>
          <h1 className='mb-3'>🎉Congratulations!🎉</h1>
          <h4 className='mb-4'>We&apos;ve received your order!</h4>
          <p className='mb-4'>
            Look out for your confirmation email at{' '}
            <strong>{user?.email}</strong>
          </p>
          <h1 className='mb-3'>🖼️</h1>
          {loadingOrder ? null : <h6 className='mb-3'>Order ID:{order.id}</h6>}
          {loadingShow || loadingOrder ? null : (
            <h6 className='mb-3'>
              We can&apos;t wait to see you at{' '}
              <strong>{show.theater_location}</strong> for{' '}
              <strong>{order.movie_title}</strong> on{' '}
              <strong>{new Date(show.start_time).toLocaleString()}</strong>!
            </h6>
          )}
          <p>
            View all orders history <Link to='/profile/orders'>here</Link>!
          </p>
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
