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
  const [cast, setCast] = useState('cast')
  const [category, setCategory] = useState('category')
  const [director, setDirector] = useState('director')
  const [producer, setProducer] = useState('producer')
  const [ratingCode, setRatingCode] = useState('rating code')
  const [reviews, setReviews] = useState('reviews')
  const [showTime, setShowTime] = useState('2016-01-02T15:04:05Z')
  const [synopsis, setSynopsis] = useState('synopsis')
  const [trailerPicture, setTrailerPicture] = useState(
    'https://placehold.co/400x592'
  )
  const [trailerVideo, setTrailerVideo] = useState(
    'https://www.youtube.com/embed/NpEaa2P7qZI?si=Ev2ybUCHzVxQPIO1&amp;controls=0'
  )

  const { run: create } = useRequest(
    async () =>
      Backend.movie.v1MoviesCreate({
        title: movieTitle,
        cast,
        category,
        director,
        producer,
        rating_code: ratingCode,
        reviews,
        show_time: showTime,
        synopsis,
        trailer_picture: trailerPicture,
        trailer_video: trailerVideo
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
        <Form.Group className='mb-3'>
          <Form.Label>Cast</Form.Label>
          <Form.Control
            type='text'
            placeholder='Cast'
            defaultValue={cast}
            onChange={e => {
              setCast(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Category'
            defaultValue={category}
            onChange={e => {
              setCategory(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Director</Form.Label>
          <Form.Control
            type='text'
            placeholder='Director'
            defaultValue={director}
            onChange={e => {
              setDirector(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Producer</Form.Label>
          <Form.Control
            type='text'
            placeholder='Producer'
            defaultValue={producer}
            onChange={e => {
              setProducer(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Rating Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Rating Code'
            defaultValue={ratingCode}
            onChange={e => {
              setRatingCode(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Reviews</Form.Label>
          <Form.Control
            type='text'
            placeholder='Reviews'
            defaultValue={reviews}
            onChange={e => {
              setReviews(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Show Time</Form.Label>
          <Form.Control
            type='date'
            placeholder='Show Time'
            defaultValue={showTime}
            onChange={e => {
              setShowTime(new Date(e.target.value).toISOString())
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Synopsis</Form.Label>
          <Form.Control
            type='text'
            placeholder='Synopsis'
            defaultValue={synopsis}
            onChange={e => {
              setSynopsis(e.target.value)
            }}
          />
        </Form.Group>
        {/* add onChange for these form controls */}
        <Form.Group className='mb-3'>
          <Form.Label>Trailer Picture</Form.Label>
          <Form.Control
            type='text'
            placeholder='Trailer Picture'
            defaultValue={trailerPicture}
            onChange={e => {
              setTrailerPicture(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Trailer Video</Form.Label>
          <Form.Control
            type='text'
            placeholder='Trailer Video'
            defaultValue={trailerVideo}
            onChange={e => {
              setTrailerVideo(e.target.value)
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
