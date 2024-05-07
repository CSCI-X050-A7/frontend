import { useRequest } from 'ahooks'
import type { ErrorResponse } from 'client/error'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'
import { Alert, Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { DOMAIN_HOST } from 'utils/constants'
import Backend from 'utils/service'

const ChangeForm: React.FC = () => {
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { run: changePasssword } = useRequest(
    async () => {
      const from = searchParams.get('from') ?? '/'
      return Backend.auth.v1AuthChangepasswordCreate(
        {
          username,
          currentPassword,
          newPassword
        },
        {
          redirect_url: `${DOMAIN_HOST}${from}`
        }
      )
    },
    {
      manual: true,
      onSuccess: () => {
        navigate('/logout') // Navigate to the login page
      },
      onError: err => {
        setError((err as ErrorResponse).error.msg)
      }
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    changePasssword()
  }

  return user ? (
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
                  setCurrentPassword(e.target.value)
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
                  setNewPassword(e.target.value)
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
        {error ? <Alert variant='danger'>{error}</Alert> : null}
      </Col>
    </>
  ) : (
    <Navigate to='/' />
  )
}

const Index: React.FC = () => (
  <PageContainer>
    <ChangeForm />
  </PageContainer>
)

export default Index
