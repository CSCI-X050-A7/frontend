import { useRequest } from 'ahooks'
import type { SchemaCard, SchemaUpdateUser, SchemaUserDetail } from 'client'
import Card from 'components/Card'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Form, Button, Col, Row, Accordion, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const UserProfileForm: React.FC = () => {
  const navigate = useNavigate()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [form, setForm] = useState<SchemaUserDetail>({
    id: '',
    email: '',
    name: '',
    username: '',
    address: '',
    address2: '',
    phone: '',
    need_promotion: false,
    city: '',
    state: '',
    zip: '',
    is_active: false,
    is_admin: false,
    cards: []
  })
  const [card1, setCard1] = useState<SchemaCard>({
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
  const [card2, setCard2] = useState<SchemaCard>({
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
  const [card3, setCard3] = useState<SchemaCard>({
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
  const usStates = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ]
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target as { name?: string; value: unknown }
    if (name === 'need_promotion') {
      setForm(changeForm => ({
        ...changeForm,
        need_promotion: !changeForm.need_promotion
      }))
    } else if (typeof name === 'string') {
      setForm(changeForm => ({ ...changeForm, [name]: value }))
    }
  }
  const { run: submit } = useRequest(
    async () => {
      const user = { ...form } as SchemaUpdateUser
      user.cards = []
      if (card1.type !== '') user.cards.push(card1)
      if (card2.type !== '') user.cards.push(card2)
      if (card3.type !== '') user.cards.push(card3)
      return Backend.user.v1UsersMeUpdate(user)
    },
    {
      manual: true,
      onSuccess: () => {
        setSuccess('Done!')
        setError('')
      },
      onError: () => {
        setSuccess('')
        setError('Update profile failed. Please try again.')
      }
    }
  )
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    submit()
  }
  const { loading } = useRequest(async () => Backend.user.v1UsersMeList(), {
    onSuccess: res => {
      setForm(res.data)
      const cardCount = res.data.cards.length
      if (cardCount > 0) setCard1(res.data.cards[0])
      if (cardCount > 1) setCard2(res.data.cards[1])
      if (cardCount > 2) setCard3(res.data.cards[2])
    }
  })

  return (
    <>
      <div className='text-center'>
        <h1>Edit Profile</h1>
      </div>
      <Col className='mx-auto mt-3'>
        <Form onSubmit={handleSubmit} validated>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label className='required'>Email</Form.Label>
              <Form.Control
                name='email'
                type='email'
                placeholder='Enter email'
                value={form.email}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Password</Form.Label>
              <Button
                type='button'
                className='form-control'
                onClick={() => navigate('/changePassword', { replace: true })}
              >
                Change Password
              </Button>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label className='required'>Name</Form.Label>
              <Form.Control
                name='name'
                required
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='required'>Phone</Form.Label>
              <Form.Control
                name='phone'
                required
                value={form.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label className='required'>Address</Form.Label>
            <Form.Control
              name='address'
              placeholder='1234 Main St'
              required
              value={form.address}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='required'>Address 2</Form.Label>
            <Form.Control
              name='address2'
              placeholder='Apartment, studio, or floor'
              value={form.address2}
              onChange={handleChange}
            />
          </Form.Group>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label className='required'>City</Form.Label>
              <Form.Control
                name='city'
                required
                value={form.city}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label className='required'>State</Form.Label>
              <Form.Select
                name='state'
                defaultValue='Choose...'
                onChange={handleChange}
                value={form.state}
              >
                <option>Choose...</option>
                {usStates.map((state, index) => (
                  <option key={index} value={state}>
                    {' '}
                    {state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={3} controlId='formGridZip'>
              <Form.Label className='required'>Zip</Form.Label>
              <Form.Control
                name='zip'
                required
                value={form.zip}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Check
              name='need_promotion'
              type='checkbox'
              label='Email me promotion'
              checked={form.need_promotion}
              onChange={handleChange}
            />
          </Row>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Payment Card 1 Information</Accordion.Header>
              <Accordion.Body>
                <Card card={card1} onChange={setCard1} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>Payment Card 2 Information</Accordion.Header>
              <Accordion.Body>
                <Card card={card2} onChange={setCard2} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>Payment Card 3 Information</Accordion.Header>
              <Accordion.Body>
                <Card card={card3} onChange={setCard3} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Form.Group as={Row} className='mt-3'>
            <Button variant='primary' type='submit' disabled={loading}>
              Submit
            </Button>
          </Form.Group>
          {success ? (
            <Alert variant='success' className='mt-3'>
              {success}
            </Alert>
          ) : null}
          {error ? (
            <Alert variant='danger' className='mt-3'>
              {error}
            </Alert>
          ) : null}
        </Form>
      </Col>
    </>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <UserProfileForm />
  </PageContainer>
)

export default Index
