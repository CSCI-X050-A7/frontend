import styles from './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaOrder } from 'client'
import PageContainer from 'components/PageContainer'
import { Card, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const OrderRow: React.FC<{
  key: string
  order: SchemaOrder
}> = ({ key, order }) => (
  <tr className='align-middle' key={key}>
    <td>{order.id}</td>
    <td>{order.movie_title}</td>
    <td>{new Date(order.created_at).toLocaleString()}</td>
    <td className={styles.hideOverflow}>{order.ticket_price.toFixed(2)}</td>
    <td className={styles.hideOverflow}>
      {order.booking_fee_price.toFixed(2)}
    </td>
    <td className={styles.hideOverflow}>{order.promotion_price.toFixed(2)}</td>
    <td className={styles.hideOverflow}>{order.sales_tax_price.toFixed(2)}</td>
    <td className={styles.hideOverflow}>{order.total_price.toFixed(2)}</td>
  </tr>
)

const Index: React.FC = () => {
  const { data, loading } = useRequest(async () =>
    Backend.user.v1UsersMeOrdersList()
  )
  return (
    <PageContainer>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <b>Order history</b>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Movie</th>
                <th>Created At</th>
                <th>Ticket Price</th>
                <th>Booking Fee Price</th>
                <th>Promotion Price</th>
                <th>Sales Tax Price</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? null
                : data?.data.data?.map(order => (
                    <OrderRow key={order.id} order={order} />
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </PageContainer>
  )
}

export default Index
