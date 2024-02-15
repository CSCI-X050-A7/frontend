import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useAuth } from 'hooks/useAuth'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [movieTitle, setMovieTitle] = useState('my movie')
  const { run: create } = useRequest(
    async () =>
      Backend.movie.v1MoviesCreate({
        author: 'string',
        meta: {
          description: 'string',
          picture: 'string',
          rating: 10
        },
        status: 0,
        title: movieTitle,
        user_id: user?.id ?? ''
      }),
    {
      manual: true,
      onSuccess: () => {
        navigate('/')
      }
    }
  )
  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Create Movie</h1>
      </div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Movie Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Movie title'
            defaultValue={movieTitle}
            onChange={e => {
              setMovieTitle(e.target.value)
            }}
          />
        </Form.Group>
        <Button
          variant='primary'
          type='button'
          onClick={(): void => {
            create()
          }}
        >
          Create
        </Button>
      </Form>
    </PageContainer>
  )
}

export default Index
