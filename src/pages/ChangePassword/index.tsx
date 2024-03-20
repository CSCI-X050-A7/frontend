import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { DOMAIN_HOST } from 'utils/constants'
import Backend from 'utils/service'

const ChangeForm: React.FC = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrent] = useState('')
  const [newPassword, setPassword] = useState('')
  const navigate = useNavigate();
const { run: changePasssword } = useRequest(
    async () => {
        const from = searchParams.get('from') ?? '/'
        return Backend.auth.v1AuthChangepasswordCreate(
            ({
                username,
                currentPassword,
                newPassword,
            }),
            {
                redirect_url: `${DOMAIN_HOST}${from}`
            }
        )
    },
    {
        manual: true,
        onSuccess: () => {
                navigate('/login') // Navigate to the Home page
            
        }
    }
)

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changePasssword()
}

 
  return user ? (
    <Navigate to='/login' />
  ) : (
    <>
      <div className='text-center'>
        <h1>Reset Password</h1>
      </div>
      <Col xs={12} md={8} lg={6} className='mx-auto mt-3'>
        <Form onSubmit={handleSubmit} validated>
          <Form.Group as={Row} className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='text-sm-end' column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='text'
                placeholder='Username'
                defaultValue={username}
                onChange={e => {
                  setUsername(e.target.value)
                }}
              />
            </Col>
          </Form.Group>
            <Form.Group as={Row} className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='text-sm-end' column sm={2}>
              Current Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
              required
              type='password'
              placeholder='Current Password'
              defaultValue={currentPassword}
              onChange={e => {
                setCurrent(e.target.value)
              }}
              />
            </Col>
            </Form.Group>
          <Form.Group as={Row} className='mb-3' controlId='formBasicPassword'>
            <Form.Label className='text-sm-end' column sm={2}>
              New Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                defaultValue={newPassword}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant='primary' type='submit'>
                Submit
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Col>
    </>
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <ChangeForm />
  </PageContainer>
)

export default Index
