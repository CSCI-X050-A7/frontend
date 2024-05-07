import styles from './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaUserDetailNoCards } from 'client'
import type { ErrorResponse } from 'client/error'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Alert, Button, Card, Form, Modal, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const UserRow: React.FC<{
  key: string
  user: SchemaUserDetailNoCards
  refresh: () => void
}> = ({ key, user, refresh }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [name, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [needPromotion, setNeedPromotion] = useState(user.need_promotion)
  const [isActive, setIsActive] = useState(user.is_active)
  const [isAdmin, setIsAdmin] = useState(user.is_admin)
  const [error, setError] = useState('')
  const { run: update } = useRequest(
    async () => {
      Backend.admin.v1AdminUsersUpdate(user.id ?? '', {
        username,
        name,
        email,
        phone,
        need_promotion: needPromotion,
        is_active: isActive,
        is_admin: isAdmin
      })
    },
    {
      manual: true,
      onSuccess: () => {
        refresh()
        handleClose()
      },
      onError: err => {
        setError((err as ErrorResponse).error.msg)
      }
    }
  )
  return (
    <>
      <tr className='align-middle' key={key}>
        <td className={styles.hideOverflow}>{user.username}</td>
        <td className={styles.hideOverflow}>{user.email}</td>
        <td className={styles.hideOverflow}>{user.name}</td>
        <td className={styles.hideOverflow}>{user.phone}</td>
        <td className={styles.hideOverflow}>
          {user.need_promotion ? 'Yes' : 'No'}
        </td>
        <td className={styles.hideOverflow}>{user.is_active ? 'Yes' : 'No'}</td>
        <td className={styles.hideOverflow}>{user.is_admin ? 'Yes' : 'No'}</td>
        <td className='text-end'>
          <Button variant='primary' onClick={handleShow}>
            Edit
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type='text'
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                label='Need Promotion'
                checked={needPromotion}
                onChange={e => setNeedPromotion(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                label='Active'
                checked={isActive}
                onChange={e => setIsActive(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Check
                type='checkbox'
                label='Admin'
                checked={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
          </Form>
          {error ? <Alert variant='danger'>{error}</Alert> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Index: React.FC = () => {
  const {
    data,
    loading,
    run: refresh
  } = useRequest(async () => Backend.admin.v1AdminUsersList())
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
                <th>Username</th>
                <th>Email</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Promotion</th>
                <th>Active</th>
                <th>Admin</th>
                <th className='text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? null
                : data?.data.data?.map(user => (
                    <UserRow
                      key={user.id ?? ''}
                      user={user}
                      refresh={refresh}
                    />
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </PageContainer>
  )
}

export default Index
