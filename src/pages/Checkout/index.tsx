import './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaCard } from 'client'
import Card from 'components/Card'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Form, Button, Col, Row, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [cards, setCards] = useState<SchemaCard[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('TODO: Implement Checkout')
    navigate('/order/confirm')
  }
  useRequest(async () => Backend.user.v1UsersMeList(), {
    onSuccess: res => {
      setCards(res.data.cards)
    }
  })
  const [card, setCard] = useState<SchemaCard>({
    id: '',
    number: '',
    expiration: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    type: ''
  })

  return (
    <>
      <div className='text-center'>
        <h1>Checkout</h1>
      </div>
      <Col className='mx-auto mt-3'>
        <div className='d-flex justify-content-center mt-3'>
          <Button
            disabled={cards.length === 0}
            onClick={() => setCard(cards[0])}
            variant='link'
          >
            Load Card 1
          </Button>
          <Button
            disabled={cards.length < 2}
            onClick={() => setCard(cards[1])}
            variant='link'
          >
            Load Card 2
          </Button>
          <Button
            disabled={cards.length < 3}
            onClick={() => setCard(cards[2])}
            variant='link'
          >
            Load Card 3
          </Button>
        </div>
        <Form onSubmit={handleSubmit} validated>
          <Card card={card} onChange={setCard} />
          <Form.Group as={Row} className='mt-3'>
            <Button variant='primary' type='submit'>
              Confirm Order
            </Button>
          </Form.Group>
        </Form>
        {error ? <Alert variant='danger'>{error}</Alert> : null}
      </Col>
    </>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <RegistrationForm />
  </PageContainer>
)

export default Index
