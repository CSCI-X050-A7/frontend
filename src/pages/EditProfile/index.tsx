import { useRequest } from 'ahooks'
import type { SchemaUpdateUser, SchemaUserDetail } from 'client'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useEffect, useState } from 'react'
import { Form, Button, Col, Row, Accordion } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const EditProfileForm = () => {
  const navigate = useNavigate()
  const { run: submit } = useRequest(async () => null)
  const { loading } = useRequest(async () => Backend.user.v1UsersMeList(), {
    onSuccess: res => {
      setForm((prevForm: SchemaUpdateUser) => ({
        ...prevForm,
        ...res.data,
      }));
    }
  })
  const [error, setError] = useState('')
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateUser()
  }
  const [form, setForm] = useState<SchemaUpdateUser>({
    address: '',
    address2: '',
    card_address: '',
    card_address2: '',
    card_city: '',
    card_expiration: '',
    card_number: '',
    card_state: '',
    card_type: '',
    card_zip: '',
    city: '',
    name: '',
    need_promotion: false,
    password: '', 
    phone: '', 
    state: '', 
    username: '', 
    zip: '',
  })

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.target as { name?: string; value: unknown }
    if (name === 'need_promotion') {
      setForm((changeForm: SchemaUpdateUser) => ({
        ...changeForm,
        need_promotion: !changeForm.need_promotion
      }))
    } else if (typeof name === 'string') {
      setForm((changeForm: SchemaUpdateUser) => ({ ...changeForm, [name]: value }))
    }
  }

  //get user information from backend and set it to form
  const [userDetails, setUserDetails] = useState<SchemaUserDetail | null>(null);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await Backend.user.v1UsersMeList();
        const details: SchemaUserDetail = response.data; 
        setUserDetails(details);

        //make the two schemas compatible, so UpdateUser is populated with the user's details
        const formCompatible: Partial<SchemaUpdateUser> = {
          address: details.address,
          address2: details.address2,
          card_address: details.card_address,
          card_address2: details.card_address2,
          card_city: details.card_city, 
          card_expiration: details.card_expiration,
          card_number: details.card_number,
          card_state: details.card_state,
          card_type: details.card_type, 
          card_zip: details.card_zip,
          city: details.city,
          name: details.name,
          need_promotion: details.need_promotion,
          password: form.password,
          phone: details.phone,
          state: details.state,
          username: details.username,
          zip: details.zip
        };
        setForm(formCompatible as SchemaUpdateUser);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
    fetchUserDetails();
  }, []);

  const { run: updateUser } = useRequest(
    async () => Backend.user.v1UserUpdate(form),
    {
      manual: true,
      onSuccess: () => {
        navigate('/edit/confirmation')
      },
      onError: err => {
        // TODO: if status is 409, tell user that email/username is already registered
        // FIX: error.message does not work?
        setError(err.message || 'Edits to profile not saved. Please try again.')
      }
    }
  ) //runRequest

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
                value={userDetails?.email ?? ''}
                disabled
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label className='required'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Password'
                value='********'
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
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
                value={form.name ?? ''}
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
                    name: e.target.value
                  }))
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPhone'>
              <Form.Label className='required'>Phone</Form.Label>
              <Form.Control
                required
                value={form.phone ?? ''}
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
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
              value={form.address ?? ''}
              onChange={e => {
                setForm(prevForm => ({
                  ...prevForm,
                  address: e.target.value
                }))
              }}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formGridAddress2'>
            <Form.Label className='required'>Address 2</Form.Label>
            <Form.Control
              placeholder='Apartment, studio, or floor'
              value={form.address2 ?? ''}
              onChange={e => {
                setForm(prevForm => ({
                  ...prevForm,
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
                value={form.city ?? ''}
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
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
                value={form.state ?? ''}
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
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
                value={form.zip ?? ''}
                onChange={e => {
                  setForm(prevForm => ({
                    ...prevForm,
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
              checked={form.need_promotion ?? false}
              onChange={e => {
                setForm(prevForm => ({
                  ...prevForm,
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
                      value={form.card_type ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
                      value={form.card_number ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
                      value={form.card_expiration ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
                    value={form.card_address ?? ''}
                    onChange={e => {
                      setForm(prevForm => ({
                        ...prevForm,
                        card_address: e.target.value
                      }))
                    }}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formGridAddress2'>
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    placeholder='Apartment, studio, or floor'
                    value={form.card_address2 ?? ''}
                    onChange={e => {
                      setForm(prevForm => ({
                        ...prevForm,
                        card_address2: e.target.value
                      }))
                    }}
                  />
                </Form.Group>
                <Row className='mb-3'>
                  <Form.Group as={Col} controlId='formGridCity'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      value={form.card_city ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
                      value={form.card_state ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
                      value={form.card_zip ?? ''}
                      onChange={e => {
                        setForm(prevForm => ({
                          ...prevForm,
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
            <Button variant='primary' type='submit'  disabled={loading}>
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
    <EditProfileForm />
  </PageContainer>
)

export default Index
