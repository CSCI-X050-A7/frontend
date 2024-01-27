import { useRequest } from 'ahooks';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSearchParams } from 'react-router-dom';
import { DOMAIN_HOST } from 'utils/constants';
import Backend from 'utils/service';

const Index: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('123456');
  const { run: login } = useRequest(
    async () => {
      const from = searchParams.get('from') ?? '/'
      return Backend.auth.v1AuthLoginCreate({
        username, password
      }, {
        redirect_url: `${DOMAIN_HOST}${from}`
      })
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
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Username" defaultValue={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" defaultValue={username} onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="button"
        onClick={(): void => login()}
      >
        Submit
      </Button>
    </Form>
  );
}

export default Index;