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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const { run: registerUser } = useRequest(
    async () =>
      Backend.admin.v1AdminUsersCreate({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        username
      }), // TODO: add more fields (promotions, payment info, address, phone...)
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
    Backend.auth.v1AuthLoginCreate({
      username: 'demo',
      password: '123456'
    })
    registerUser()
    e.preventDefault()
    Backend.auth.v1AuthLogoutCreate()
    // validate input fields
    // if (!email || !password || !name || !phone) {
    //   setError('Please fill in all mandatory fields')
    //   return
    // }
    // send registration request to the server
    // handle response and set error or success message accordingly
  }

  // eslint-disable-next-line
  const [checked, setChecked] = useState(false)
  // eslint-disable-next-line
  const handleCheckboxChange = () => {
    // TODO: change user's promotions preference to true
    setChecked(prevChecked => !prevChecked)
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
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label className='required'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label className='required'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password (10 characters or longer)'
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridFirstName'>
              <Form.Label className='required'>Name</Form.Label>
              <Form.Control
                type='firstName'
                placeholder='First Name'
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridLastName'>
              <Form.Label className='required'>Last Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Last Name'
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='required'>Phone</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Row>

          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label className='required'>Address</Form.Label>
            <Form.Control placeholder='1234 Main St' required />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='required'>Address 2</Form.Label>
            <Form.Control placeholder='Apartment, studio, or floor' required />
          </Form.Group>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label className='required'>City</Form.Label>
              <Form.Control required />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label className='required'>State</Form.Label>
              <Form.Select defaultValue='Choose...' required>
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={3} controlId='formGridZip'>
              <Form.Label className='required'>Zip</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Check type='checkbox' label='Email me promotion' />
          </Row>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Payment Information</Accordion.Header>
              <Accordion.Body>
                <Row className='mb-3'>
                  <Form.Group as={Col} md={3} controlId='formGridEmail'>
                    <Form.Label>Card Type</Form.Label>
                    <Form.Select>
                      <option value=''>Select card type</option>
                      <option value='Visa'>Visa</option>
                      <option value='MasterCard'>MasterCard</option>
                      <option value='American Express'>American Express</option>
                      <option value='Discover'>Discover</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group as={Col} md={6} controlId='formGridCardNumber'>
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId='formGridCardExp'>
                    <Form.Label>Card Expiration</Form.Label>
                    <Form.Control type='text' placeholder='01/28' />
                  </Form.Group>
                </Row>
                <Form.Group className='mb-3' controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control placeholder='1234 Main St' />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGridAddress2'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control placeholder='Apartment, studio, or floor' />
                </Form.Group>
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                  </Form.Group>
                  <Form.Group as={Col} controlId='formGridState'>
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue='Choose...'>
                      <option>Choose...</option>
                      <option>...</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId='formGridZip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                  </Form.Group>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <input
            type='checkbox'
            id='promotions'
            checked={checked}
            onChange={handleCheckboxChange}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor='promotions' style={{ padding: '10px' }}>
            I would like to receive promotions!
          </label>

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
