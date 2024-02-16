import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate, useSearchParams } from 'react-router-dom'
import { DOMAIN_HOST } from 'utils/constants'
import Backend from 'utils/service'

const LoginForm: React.FC = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('demo')
  const [password, setPassword] = useState('123456')
  const { run: login } = useRequest(
    async () => {
      const from = searchParams.get('from') ?? '/'
      return Backend.auth.v1AuthLoginCreate(
        {
          username,
          password
        },
        {
          redirect_url: `${DOMAIN_HOST}${from}`
        }
      )
    },
    {
      manual: true,
      onSuccess: res => {
        if (res.data.redirect_url) {
          window.location.href = res.data.redirect_url
        }
      }
    }
  )
  return user ? (
    <Navigate to='/' />
  ) : (
    <>
      <div className='text-center'>
        <h1>Login</h1>
      </div>
      <Col xs={12} md={8} lg={6} className='mx-auto mt-3'>
        <Form validated>
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
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                defaultValue={password}
                onChange={e => {
                  setPassword(e.target.value)
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                variant='primary'
                type='button'
                onClick={(): void => {
                  login()
                }}
              >
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
    <LoginForm />
  </PageContainer>
)

export default Index
