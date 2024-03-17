import './style.module.css'
import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Form, Button, Col, Row, Alert, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const RegistrationForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    address: '',
    address2: '',
    phone: '',
    need_promotion: false,
    city: '',
    state: '',
    zip: '',
    card_address: '',
    card_address2: '',
    card_city: '',
    card_state: '',
    card_zip: '',
    card_type: '',
    card_number: '',
    card_exp: ''
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

  // fix: is there a better way to handle this?
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

  const { run: registerUser } = useRequest(
    async () => Backend.auth.v1AuthRegisterCreate(form),
    {
      manual: true,
      onSuccess: () => {
        navigate('/register/confirm')
      },
      onError: err => {
        // TODO: if status is 409, tell user that email/username is already registered
        // FIX: error.message does not work?
        setError(err.message || 'Registration failed. Please try again.')
      }
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    registerUser()
    e.preventDefault()
  }

  return (
    <>
      <div className='text-center'>
        <h1>Registration</h1>
      </div>
      <Col className='mx-auto mt-3'>
        <Form onSubmit={handleSubmit} validated>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridUsername'>
              <Form.Label className='required'>Username</Form.Label>
              <Form.Control
                type='username'
                placeholder='Enter username (5 characters or longer)'
                required
                value={form.username}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label className='required'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                required
                value={form.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label className='required'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password (10 characters or longer)'
                required
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label className='required'>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Name'
                required
                value={form.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='required'>Phone</Form.Label>
              <Form.Control
                type='phone'
                placeholder='Phone'
                required
                value={form.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label className='required'>Address</Form.Label>
            <Form.Control
              type='address'
              placeholder='1234 Main St'
              required
              value={form.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='required'>Address 2</Form.Label>
            <Form.Control
              type='address2'
              placeholder='Apartment, studio, or floor'
              required
              value={form.address2}
              onChange={handleChange}
            />
          </Form.Group>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label className='required'>City</Form.Label>
              <Form.Control
                type='city'
                placeholder='City'
                required
                value={form.city}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label className='required'>State</Form.Label>
              <Form.Select
                defaultValue='Choose...'
                onChange={handleChange}
                name='state'
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
                type='zip'
                required
                value={form.zip}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Check
              type='checkbox'
              label='Email me promotions!'
              onChange={handleChange}
              name='need_promotion'
            />
          </Row>

          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Payment Information</Accordion.Header>
              <Accordion.Body>
                <Row className='mb-3'>
                  <Form.Group as={Col} md={3} controlId='formGridCardType'>
                    <Form.Label>Card Type</Form.Label>
                    <Form.Select
                      defaultValue='Choose...'
                      onChange={handleChange}
                      name='card_type'
                    >
                      <option value=''>Select card type</option>
                      <option value='Visa'>Visa</option>
                      <option value='MasterCard'>MasterCard</option>
                      <option value='American Express'>American Express</option>
                      <option value='Discover'>Discover</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridCardNumber'>
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                      type='card_number'
                      required
                      value={form.card_number}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md={3} controlId='formGridCardExp'>
                    <Form.Label>Card Expiration</Form.Label>
                    <Form.Control
                      type='text'
                      required
                      placeholder='01/28'
                      value={form.card_exp}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className='mb-3' controlId='formGridCardAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type='card_address'
                    required
                    placeholder='1234 Main St'
                    value={form.card_address}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className='mb-3' controlId='formGridCardAddress2'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type='card_address2'
                    required
                    placeholder='Apartment, studio, or floor'
                    value={form.card_address2}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCardCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='card_city'
                      required
                      placeholder='City'
                      value={form.card_city}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId='formGridCardState'>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      defaultValue='Choose...'
                      onChange={handleChange}
                      name='card_state'
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

                  <Form.Group as={Col} md={3} controlId='formGridCardZip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      type='state'
                      value={form.state}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Form.Group as={Row} className='mt-3'>
            <Button variant='primary' type='submit'>
              Register
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
