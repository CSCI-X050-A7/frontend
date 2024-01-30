import { useRequest } from 'ahooks';
import { useAuth } from 'hooks/useAuth';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Backend from 'utils/service';
import { useNavigate } from 'react-router-dom'

const Index: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [bookTitle, setBookTitle] = useState('my book')
  const { run: create } = useRequest(
    async () => {
      return Backend.book.v1BooksCreate({
        "author": "string",
        "meta": {
          "description": "string",
          "picture": "string",
          "rating": 10
        },
        "status": 0,
        "title": bookTitle,
        "user_id": user?.id ?? '',
      })
    },
    {
      manual: true,
      onSuccess: res => {
        console.log('res.data', res.data)
        navigate('/')
      }
    }
  )
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Book Title</Form.Label>
        <Form.Control type="text" placeholder="Username" defaultValue={bookTitle} onChange={e => setBookTitle(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="button"
        onClick={(): void => create()}
      >
        Create
      </Button>
    </Form>
  );
}

export default Index;
