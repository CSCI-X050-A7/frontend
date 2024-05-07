import { useRequest } from 'ahooks'
import type { ErrorResponse } from 'client/error'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Col, Row, Form, Button, Alert } from 'react-bootstrap'
import Backend from 'utils/service'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [info, setInfo] = useState('')
  const [error, setError] = useState('')
  const { run } = useRequest(
    async () => Backend.auth.v1AuthForgotpasswordCreate({ email }),
    {
      manual: true,
      onSuccess: () => {
        setInfo('Done! Check you email!')
      },
      onError: err => {
        setError((err as ErrorResponse).error.msg)
      }
    }
  )
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    run()
  }
  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Forgot Password</h1>
      </div>
      <Col xs={12} md={8} lg={6} className='mx-auto mt-3'>
        {info ? <Alert variant='success'>{info}</Alert> : null}
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className='mb-3' controlId='formBasicEmail'>
            <Form.Label className='text-sm-end' column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='email'
                placeholder='Enter your email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className='mb-3'>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button variant='primary' type='submit'>
                Send Reset Email
              </Button>
            </Col>
          </Form.Group>
        </Form>
        {error ? <Alert variant='danger'>{error}</Alert> : null}
      </Col>
    </PageContainer>
  )
}

export default ForgotPassword
