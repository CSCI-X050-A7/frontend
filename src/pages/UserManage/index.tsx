import styles from './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaUser } from 'client'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { Card, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const { data, loading } = useRequest(async () =>
    Backend.admin.v1AdminUsersList()
  )
  return (
    <PageContainer>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <b>Manage User</b>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className='small text-uppercase'>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Is Active</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? null
                : data?.data.data?.map((user: SchemaUser) => (
                    <tr className='align-middle' key={user.id}>
                      <td className={styles.hideOverflow}>{user.id}</td>
                      <td className={styles.hideOverflow}>{user.username}</td>
                      <td className={styles.hideOverflow}>{user.email}</td>
                      <td className={styles.hideOverflow}>{user.name}</td>
                      <td className={styles.hideOverflow}>
                        {user.is_active ? 'Yes' : 'No'}
                      </td>
                      <td className={styles.hideOverflow}>
                        {user.is_admin ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </PageContainer>
  )
}

export default Index
