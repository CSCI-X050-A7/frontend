import styles from './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaPromotion } from 'client'
import type { ErrorResponse } from 'client/error'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Alert, Button, Card, Form, Modal, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const PromoRow: React.FC<{
  key: string
  promo: SchemaPromotion
  refresh: () => void
}> = ({ key, promo, refresh }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [code, setCode] = useState(promo.code)
  const [discount, setDiscount] = useState(promo.discount)
  const [error, setError] = useState('')
  const { run: update } = useRequest(
    async () => {
      Backend.admin.v1AdminPromotionsUpdate(promo.id, {
        code,
        discount
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
        <td className={styles.hideOverflow}>{promo.code}</td>
        <td className={styles.hideOverflow}>{promo.discount}</td>
        <td className='text-end'>
          <Button variant='primary' onClick={handleShow}>
            Edit
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Promo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type='text'
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type='number'
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
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
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState<number>(0)
  const [error, setError] = useState('')
  const {
    data,
    loading,
    run: refresh
  } = useRequest(async () => Backend.admin.v1AdminPromotionsList())
  const { run: create } = useRequest(
    async () =>
      Backend.admin.v1AdminPromotionsCreate({
        code,
        discount
      }),
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
    <PageContainer>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <b>Manage Promo</b>
            <Button variant='primary' className='ml-auto' onClick={handleShow}>
              Create
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className='small text-uppercase'>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th className='text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? null
                : data?.data.data?.map(promo => (
                    <PromoRow key={promo.id} promo={promo} refresh={refresh} />
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Promo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type='text'
                value={code}
                onChange={e => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type='number'
                value={discount}
                onChange={e => setDiscount(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
          {error ? <Alert variant='danger'>{error}</Alert> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='button'
            onClick={(): void => {
              create()
            }}
          >
            Add Promo
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  )
}

export default Index
