import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [movieTitle, setMovieTitle] = useState('my movie')
  const { run: create } = useRequest(
    async () =>
      // TODO: replace the movie with user input
      Backend.movie.v1MoviesCreate({
        title: movieTitle,
        cast: 'cast',
        category: 'category',
        director: 'director',
        producer: 'producer',
        rating_code: 'rating_code',
        reviews: 'reviews',
        show_time: '2016-01-02T15:04:05Z',
        synopsis: 'synopsis',
        trailer_picture: 'https://placehold.co/400x592',
        trailer_video:
          'https://www.youtube.com/embed/NpEaa2P7qZI?si=Ev2ybUCHzVxQPIO1&amp;controls=0'
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
