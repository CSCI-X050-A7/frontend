import { useRequest } from 'ahooks'
import type { SchemaUpdateUser, SchemaUserDetail } from 'client'
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
    card_address: '',
    card_address2: '',
    card_city: '',
    card_state: '',
    card_zip: '',
    card_type: '',
    card_number: '',
    card_expiration: '',
    is_active: false,
    is_admin: false
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
    async () => Backend.user.v1UsersMeUpdate(form as SchemaUpdateUser),
    {
      manual: true,
      onSuccess: () => {
        setSuccess('Done!')
      },
      onError: () => {
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
              <Accordion.Header>Payment Information</Accordion.Header>
              <Accordion.Body>
                <Row className='mb-3'>
                  <Form.Group as={Col} md={3} controlId='formGridEmail'>
                    <Form.Label>Card Type</Form.Label>
                    <Form.Select
                      name='card_type'
                      value={form.card_type}
                      onChange={handleChange}
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
                      name='card_number'
                      value={form.card_number}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId='formGridCardExp'>
                    <Form.Label>Card Expiration</Form.Label>
                    <Form.Control
                      name='card_expiration'
                      type='text'
                      placeholder='01/28'
                      value={form.card_expiration}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className='mb-3' controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    name='card_address'
                    placeholder='1234 Main St'
                    value={form.card_address}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGridAddress2'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    name='card_address2'
                    placeholder='Apartment, studio, or floor'
                    value={form.card_address2}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name='card_city'
                      value={form.card_city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId='formGridState'>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      name='card_state'
                      defaultValue='Choose...'
                      onChange={handleChange}
                      value={form.card_state}
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
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      name='card_zip'
                      value={form.card_zip}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
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
