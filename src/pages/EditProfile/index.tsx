import { useRequest } from 'ahooks'
import type { SchemaUpdateUser, SchemaUserDetail } from 'client'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Form, Button, Col, Row, Accordion } from 'react-bootstrap'
import Backend from 'utils/service'

const UserProfileForm: React.FC<{
  key: string
  updateUser: SchemaUpdateUser
  refresh: () => void
}>= ({ key, updateUser, refresh }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [address, setAddress] = useState(updateUser.address)
  const [address2,setAddress2] = useState(updateUser.address2)
  const [card_address,setCard_address] = useState(updateUser.card_address)
  const [card_address2,setCard_address2] = useState(updateUser.card_address2)
  const [card_city, setCard_city] = useState(updateUser.card_city)
  const [card_expiration, setCard_expiration] = useState(updateUser.card_expiration)
  const [card_number, setCard_number] = useState(updateUser.card_number)
  const [card_state, setCard_state] = useState(updateUser.card_state)
  const [card_type, setCard_type] = useState(updateUser.card_type)
  const [card_zip, setCard_zip] = useState(updateUser.card_zip)
  const [city, setCity] = useState(updateUser.city)
  const [name, setName] = useState(updateUser.name)
  const [need_promotion, setNeed_promotion] = useState(updateUser.need_promotion)
  const { run: submit } = useRequest(
    async () => {
      Backend.user.v1UserUpdate(updateUser.username, {
        address,
        address2,
        card_address,
        card_address2,
        card_city,
        card_expiration,
        card_number,
        card_state,
        card_type,
        card_zip,
        city,
        name,
        need_promotion,
        password: '',
        phone: '',
        state: '',
        username: '',
        zip: ''
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
                type='email'
                placeholder='Enter email'
                value={user?.email ?? ''}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label className='required'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    password: e.target.value
                  }))
                }}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridName'>
              <Form.Label className='required'>Name</Form.Label>
              <Form.Control
                required
                value={user?.name ?? ''}
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    name: e.target.value
                  }))
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='required'>Phone</Form.Label>
              <Form.Control
                required
                value={user?.phone ?? ''}
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    phone: e.target.value
                  }))
                }}
              />
            </Form.Group>
          </Row>
          <Form.Group className='mb-3' controlId='formGridAddress1'>
            <Form.Label className='required'>Address</Form.Label>
            <Form.Control
              placeholder='1234 Main St'
              required
              value={user?.address ?? ''}
              onChange={e => {
                setUser(prevUser => ({
                  ...prevUser,
                  address: e.target.value
                }))
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='required'>Address 2</Form.Label>
            <Form.Control
              placeholder='Apartment, studio, or floor'
              value={user?.address2 ?? ''}
              onChange={e => {
                setUser(prevUser => ({
                  ...prevUser,
                  address2: e.target.value
                }))
              }}
            />
          </Form.Group>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label className='required'>City</Form.Label>
              <Form.Control
                required
                value={user?.city ?? ''}
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    city: e.target.value
                  }))
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label className='required'>State</Form.Label>
              <Form.Select
                defaultValue='GA'
                required
                value={user?.state ?? ''}
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    state: e.target.value
                  }))
                }}
              >
                <option value='AL'>Alabama</option>
                <option value='AK'>Alaska</option>
                <option value='AZ'>Arizona</option>
                <option value='AR'>Arkansas</option>
                <option value='CA'>California</option>
                <option value='CO'>Colorado</option>
                <option value='CT'>Connecticut</option>
                <option value='DE'>Delaware</option>
                <option value='DC'>District Of Columbia</option>
                <option value='FL'>Florida</option>
                <option value='GA'>Georgia</option>
                <option value='HI'>Hawaii</option>
                <option value='ID'>Idaho</option>
                <option value='IL'>Illinois</option>
                <option value='IN'>Indiana</option>
                <option value='IA'>Iowa</option>
                <option value='KS'>Kansas</option>
                <option value='KY'>Kentucky</option>
                <option value='LA'>Louisiana</option>
                <option value='ME'>Maine</option>
                <option value='MD'>Maryland</option>
                <option value='MA'>Massachusetts</option>
                <option value='MI'>Michigan</option>
                <option value='MN'>Minnesota</option>
                <option value='MS'>Mississippi</option>
                <option value='MO'>Missouri</option>
                <option value='MT'>Montana</option>
                <option value='NE'>Nebraska</option>
                <option value='NV'>Nevada</option>
                <option value='NH'>New Hampshire</option>
                <option value='NJ'>New Jersey</option>
                <option value='NM'>New Mexico</option>
                <option value='NY'>New York</option>
                <option value='NC'>North Carolina</option>
                <option value='ND'>North Dakota</option>
                <option value='OH'>Ohio</option>
                <option value='OK'>Oklahoma</option>
                <option value='OR'>Oregon</option>
                <option value='PA'>Pennsylvania</option>
                <option value='RI'>Rhode Island</option>
                <option value='SC'>South Carolina</option>
                <option value='SD'>South Dakota</option>
                <option value='TN'>Tennessee</option>
                <option value='TX'>Texas</option>
                <option value='UT'>Utah</option>
                <option value='VT'>Vermont</option>
                <option value='VA'>Virginia</option>
                <option value='WA'>Washington</option>
                <option value='WV'>West Virginia</option>
                <option value='WI'>Wisconsin</option>
                <option value='WY'>Wyoming</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md={3} controlId='formGridZip'>
              <Form.Label className='required'>Zip</Form.Label>
              <Form.Control
                required
                value={user?.zip ?? ''}
                onChange={e => {
                  setUser(prevUser => ({
                    ...prevUser,
                    zip: e.target.value
                  }))
                }}
              />
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Check
              type='checkbox'
              label='Email me promotion'
              checked={user?.need_promotion ?? false}
              onChange={e => {
                setUser(prevUser => ({
                  ...prevUser,
                  need_promotion: e.target.checked
                }))
              }}
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
                      value={user?.card_type ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_type: e.target.value
                        }))
                      }}
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
                      value={user?.card_number ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_number: e.target.value
                        }))
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId='formGridCardExp'>
                    <Form.Label>Card Expiration</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='01/28'
                      value={user?.card_expiration ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_expiration: e.target.value
                        }))
                      }}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className='mb-3' controlId='formGridAddress1'>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    placeholder='1234 Main St'
                    value={user?.card_address ?? ''}
                    onChange={e => {
                      setUser(prevUser => ({
                        ...prevUser,
                        card_address: e.target.value
                      }))
                    }}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGridAddress2'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    placeholder='Apartment, studio, or floor'
                    value={user?.card_address2 ?? ''}
                    onChange={e => {
                      setUser(prevUser => ({
                        ...prevUser,
                        card_address2: e.target.value
                      }))
                    }}
                  />
                </Form.Group>
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={user?.card_city ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_city: e.target.value
                        }))
                      }}
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId='formGridState'>
                    <Form.Label>State</Form.Label>
                    <Form.Select
                      defaultValue='GA'
                      required
                      value={user?.card_state ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_state: e.target.value
                        }))
                      }}
                    >
                      <option value='AL'>Alabama</option>
                      <option value='AK'>Alaska</option>
                      <option value='AZ'>Arizona</option>
                      <option value='AR'>Arkansas</option>
                      <option value='CA'>California</option>
                      <option value='CO'>Colorado</option>
                      <option value='CT'>Connecticut</option>
                      <option value='DE'>Delaware</option>
                      <option value='DC'>District Of Columbia</option>
                      <option value='FL'>Florida</option>
                      <option value='GA'>Georgia</option>
                      <option value='HI'>Hawaii</option>
                      <option value='ID'>Idaho</option>
                      <option value='IL'>Illinois</option>
                      <option value='IN'>Indiana</option>
                      <option value='IA'>Iowa</option>
                      <option value='KS'>Kansas</option>
                      <option value='KY'>Kentucky</option>
                      <option value='LA'>Louisiana</option>
                      <option value='ME'>Maine</option>
                      <option value='MD'>Maryland</option>
                      <option value='MA'>Massachusetts</option>
                      <option value='MI'>Michigan</option>
                      <option value='MN'>Minnesota</option>
                      <option value='MS'>Mississippi</option>
                      <option value='MO'>Missouri</option>
                      <option value='MT'>Montana</option>
                      <option value='NE'>Nebraska</option>
                      <option value='NV'>Nevada</option>
                      <option value='NH'>New Hampshire</option>
                      <option value='NJ'>New Jersey</option>
                      <option value='NM'>New Mexico</option>
                      <option value='NY'>New York</option>
                      <option value='NC'>North Carolina</option>
                      <option value='ND'>North Dakota</option>
                      <option value='OH'>Ohio</option>
                      <option value='OK'>Oklahoma</option>
                      <option value='OR'>Oregon</option>
                      <option value='PA'>Pennsylvania</option>
                      <option value='RI'>Rhode Island</option>
                      <option value='SC'>South Carolina</option>
                      <option value='SD'>South Dakota</option>
                      <option value='TN'>Tennessee</option>
                      <option value='TX'>Texas</option>
                      <option value='UT'>Utah</option>
                      <option value='VT'>Vermont</option>
                      <option value='VA'>Virginia</option>
                      <option value='WA'>Washington</option>
                      <option value='WV'>West Virginia</option>
                      <option value='WI'>Wisconsin</option>
                      <option value='WY'>Wyoming</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md={3} controlId='formGridZip'>
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                      value={user?.card_zip ?? ''}
                      onChange={e => {
                        setUser(prevUser => ({
                          ...prevUser,
                          card_zip: e.target.value
                        }))
                      }}
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
