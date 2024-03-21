import PageContainer from 'components/PageContainer';
import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import Backend from 'utils/service'

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Call the v1AuthForgotpasswordCreate function and pass the email as an object
      await Backend.auth.v1AuthForgotpasswordCreate({ email });
      


    } catch (error) {
      // Handle any errors that occur during the API call
      
    }
  };

  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Forgot Password</h1>
      </div>
      <Col xs={12} md={8} lg={6} className='mx-auto mt-3'>
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
                onChange={(e) => setEmail(e.target.value)}
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
      </Col>
    </PageContainer>
  );
};

export default ForgotPassword;