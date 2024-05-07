import styles from './style.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Card, Table } from 'react-bootstrap'

const OrderRow: React.FC<{
  key: string
}> = (
  { key } // TODO: add refresh back
) => (
  <tr className='align-middle' key={key}>
    <td className={styles.hideOverflow}>(Some movie)</td>
    <td className={styles.hideOverflow}>(01-01-2024)</td>
    <td className={styles.hideOverflow}>(Some seats)</td>
    <td className={styles.hideOverflow}>(Some tickets)</td>
    <td className={styles.hideOverflow}>(A promo used)</td>
    <td className={styles.hideOverflow}>(The card used)</td>
    <td className='text-end'>end</td>
  </tr>
)

const Index: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [key, setKey] = useState('')
  return (
    <PageContainer>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <h2>Your Order History</h2>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead>
              <tr>
                <th>MOVIE</th>
                <th>DATE</th>
                <th>SEATS</th>
                <th>TICKETS</th>
                <th>PROMOTION USED</th>
                <th>CARD USED</th>
              </tr>
            </thead>
            <tbody>
              <OrderRow key={key} />
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </PageContainer>
  )
}

export default Index
