/* eslint-disable react/prop-types */
import { useRequest } from 'ahooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { SchemaPromotion } from 'client'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Button, Card, Form, Modal, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const PromoRow: React.FC<{
  key: string
  promo: SchemaPromotion
  refresh: () => void
}> = ({ key, promo, refresh }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [promoTitle, setPromoTitle] = useState(promo.title)
  const [description, setDescription] = useState(promo.description)
  const [discount, setDiscount] = useState(promo.discount)
  const [expiry, setExpiry] = useState(promo.expiry_date)
  const [isExpired, setIsExpired] = useState(promo.is_expired)
  const [affected, setAffected] = useState(promo.movie_affected)
  const { run: update } = useRequest(
    async () => {
      Backend.promotion.v1PromotionsUpdate(promo.id, {
        title: promoTitle,
        description,
        discount,
        expiry_date: expiry,
        is_expired: isExpired,
        movie_affected: affected
      })
    },
    {
      manual: true,
      onSuccess: () => {
        refresh()
        handleClose()
      }
    }
  )
  // TODO: add styles
  return (
    <>
      <tr className='align-middle' key={key}>
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={promoTitle}
                onChange={e => setPromoTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='number'
                value={discount}
                // TODO: Fix type
                onChange={e => setDiscount(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type='text'
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Is Expired</Form.Label>
              <Form.Check
                type='checkbox'
                // TODO: Fix type
                checked={isExpired}
                onChange={e => setIsExpired(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Movie Affected</Form.Label>
              <Form.Control
                type='text'
                value={affected}
                onChange={e => setAffected(e.target.value)}
              />
            </Form.Group>
          </Form>
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
  const [promoTitle, setPromoTitle] = useState('')
  const [description, setDescription] = useState('')
  const [discount, setDiscount] = useState<number>(0)
  const [expiry, setExpiry] = useState('')
  const [isExpired, setIsExpired] = useState(false)
  const [affected, setAffected] = useState('')
  const {
    data,
    loading,
    run: refresh
  } = useRequest(async () => Backend.promotion.v1PromotionsList())
  const { run: create } = useRequest(
    async () =>
      Backend.promotion.v1PromotionsCreate({
        title: promoTitle,
        description,
        discount,
        expiry_date: expiry,
        is_expired: isExpired,
        movie_affected: affected
      }),
    {
      manual: true,
      onSuccess: () => {
        refresh()
        handleClose()
      }
    }
  )
  return (
    <PageContainer>
      <Card>
        <Card.Header>
          <h5>Promotion Management</h5>
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
                <th>Title</th>
                <th>Description</th>
                <th>Discount</th>
                <th>Expiry Date</th>
                <th>Is Expired</th>
                <th>Movie Affected</th>
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
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={promoTitle}
                onChange={e => setPromoTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={e => setDescription(e.target.value)}
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
            <Form.Group className='mb-3'>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type='text'
                value={expiry}
                onChange={e => setExpiry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Is Expired</Form.Label>
              <Form.Check
                type='checkbox'
                checked={isExpired}
                onChange={e => setIsExpired(e.target.checked)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Movie Affected</Form.Label>
              <Form.Control
                type='text'
                value={affected}
                onChange={e => setAffected(e.target.value)}
              />
            </Form.Group>
          </Form>
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
