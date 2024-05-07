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
    <td className={styles.hideOverflow}>{order.movie_title}</td>
    <td className={styles.hideOverflow}>{order.created_at}</td>
    <td className={styles.hideOverflow}>{order.ticket_price}</td>
    <td className={styles.hideOverflow}>{order.booking_fee_price}</td>
    <td className={styles.hideOverflow}>{order.promotion_price}</td>
    <td className={styles.hideOverflow}>{order.sales_tax_price}</td>
    <td className={styles.hideOverflow}>{order.total_price}</td>
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
