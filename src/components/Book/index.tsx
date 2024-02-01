import { useRequest } from 'ahooks'
import type React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const { data, loading } = useRequest(async () => Backend.book.v1BooksList())
  return (
    <>
      <div className='text-center'>
        <h1>Vite + React + React-Bootstrap</h1>
        <p>
          Visit backend swagger: <a href='/swagger'>here</a>
        </p>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>
              <b>{loading ? 'loading...' : 'Books'}</b>
            </Card.Title>
          </Card.Body>
          {!loading && (
            <ListGroup variant='flush'>
              {data?.data.data?.map(book => (
                <ListGroup.Item key={book.id}>{book.title}</ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card>
      </div>
    </>
  )
}

export default Index
