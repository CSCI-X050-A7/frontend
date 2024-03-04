import styles from './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaMovie } from 'client'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Button, Card, Form, Modal, Table } from 'react-bootstrap'
import Backend from 'utils/service'

const MovieRow: React.FC<{
  key: string
  movie: SchemaMovie
  refresh: () => void
}> = ({ key, movie, refresh }) => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [movieTitle, setMovieTitle] = useState(movie.title)
  const [cast, setCast] = useState(movie.cast)
  const [category, setCategory] = useState(movie.category)
  const [director, setDirector] = useState(movie.director)
  const [producer, setProducer] = useState(movie.producer)
  const [ratingCode, setRatingCode] = useState(movie.rating_code)
  const [reviews, setReviews] = useState(movie.reviews)
  const [showTime, setShowTime] = useState(movie.show_time.slice(0, -1))
  const [synopsis, setSynopsis] = useState(movie.synopsis)
  const [trailerPicture, setTrailerPicture] = useState(movie.trailer_picture)
  const [trailerVideo, setTrailerVideo] = useState(movie.trailer_video)
  const { run: update } = useRequest(
    async () => {
      Backend.movie.v1MoviesUpdate(movie.id, {
        title: movieTitle,
        cast,
        category,
        director,
        producer,
        rating_code: ratingCode,
        reviews,
        show_time: new Date(showTime).toISOString(),
        synopsis,
        trailer_picture: trailerPicture,
        trailer_video: trailerVideo
      })
    },
    {
      manual: true,
      onSuccess: () => {
        refresh()
        handleClose()
      }
    }
  )
  return (
    <>
      <tr className='align-middle' key={key}>
        <td className={styles.hideOverflow}>{movie.title}</td>
        <td className={styles.hideOverflow}>{movie.cast}</td>
        <td className={styles.hideOverflow}>{movie.category}</td>
        <td className={styles.hideOverflow}>{movie.director}</td>
        <td className={styles.hideOverflow}>{movie.producer}</td>
        <td className={styles.hideOverflow}>{movie.rating_code}</td>
        <td className={styles.hideOverflow}>{movie.reviews}</td>
        <td className={styles.hideOverflow}>{movie.show_time}</td>
        <td className={styles.hideOverflow}>{movie.synopsis}</td>
        <td className={styles.hideOverflow}>{movie.trailer_picture}</td>
        <td className={styles.hideOverflow}>{movie.trailer_video}</td>
        <td className='text-end'>
          <Button variant='primary' onClick={handleShow}>
            Edit
          </Button>
        </td>
      </tr>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={movieTitle}
                onChange={e => setMovieTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Cast</Form.Label>
              <Form.Control
                type='text'
                value={cast}
                onChange={e => setCast(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Director</Form.Label>
              <Form.Control
                type='text'
                value={director}
                onChange={e => setDirector(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Producer</Form.Label>
              <Form.Control
                type='text'
                value={producer}
                onChange={e => setProducer(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Rating Code</Form.Label>
              <Form.Control
                type='text'
                value={ratingCode}
                onChange={e => setRatingCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Reviews</Form.Label>
              <Form.Control
                type='text'
                value={reviews}
                onChange={e => setReviews(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Show Time</Form.Label>
              <Form.Control
                type='datetime-local'
                value={showTime}
                onChange={e => setShowTime(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Synopsis</Form.Label>
              <Form.Control
                type='text'
                value={synopsis}
                onChange={e => setSynopsis(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Trailer Picture</Form.Label>
              <Form.Control
                type='text'
                value={trailerPicture}
                onChange={e => setTrailerPicture(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Trailer Video</Form.Label>
              <Form.Control
                type='text'
                value={trailerVideo}
                onChange={e => setTrailerVideo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={update}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const Index: React.FC = () => {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [movieTitle, setMovieTitle] = useState('my movie')
  const [cast, setCast] = useState('cast')
  const [category, setCategory] = useState('category')
  const [director, setDirector] = useState('director')
  const [producer, setProducer] = useState('producer')
  const [ratingCode, setRatingCode] = useState('rating code')
  const [reviews, setReviews] = useState('reviews')
  const [showTime, setShowTime] = useState('2024-03-14T18:27')
  const [synopsis, setSynopsis] = useState('synopsis')
  const [trailerPicture, setTrailerPicture] = useState(
    'https://placehold.co/400x592'
  )
  const [trailerVideo, setTrailerVideo] = useState(
    'https://www.youtube.com/embed/NpEaa2P7qZI?si=Ev2ybUCHzVxQPIO1&amp;controls=0'
  )
  const {
    data,
    loading,
    run: refresh
  } = useRequest(async () => Backend.movie.v1MoviesList())
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
        show_time: new Date(showTime).toISOString(),
        synopsis,
        trailer_picture: trailerPicture,
        trailer_video: trailerVideo
      }),
    {
      manual: true,
      onSuccess: () => {
        refresh()
        handleClose()
      }
    }
  )
  return (
    <PageContainer>
      <Card>
        <Card.Header>
          <div className='d-flex justify-content-between align-items-center'>
            <b>Manage Movie</b>
            <Button variant='primary' className='ml-auto' onClick={handleShow}>
              Create
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Table hover>
            <thead className='small text-uppercase'>
              <tr>
                <th>Title</th>
                <th>Cast</th>
                <th>Category</th>
                <th>Director</th>
                <th>Producer</th>
                <th>Rating Code</th>
                <th>Reviews</th>
                <th>Show Time</th>
                <th>Synopsis</th>
                <th>Trailer Picture</th>
                <th>Trailer Video</th>
                <th className='text-end'>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? null
                : data?.data.data?.map(movie => (
                    <MovieRow key={movie.id} movie={movie} refresh={refresh} />
                  ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                type='datetime-local'
                placeholder='Show Time'
                defaultValue={showTime}
                onChange={e => {
                  setShowTime(e.target.value)
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='primary'
            type='button'
            onClick={(): void => {
              create()
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </PageContainer>
  )
}

export default Index
