import './style.module.css'
import { useRequest } from 'ahooks'
import type { SchemaMovie } from 'client'
import PageContainer from 'components/PageContainer'
import type React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Backend from 'utils/service'

const Movie: React.FC<{ movie: SchemaMovie }> = ({ movie }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  return (
    <Card style={{ width: '18rem' }} className='mb-3'>
      <Card.Img variant='top' src={movie.trailer_picture} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <div>Director: {movie.director}</div>
          <div>Cast: {movie.cast}</div>
          <div>Category: {movie.category}</div>
        </Card.Text>
        <Button variant='secondary' onClick={handleShow}>
          Watch Trailer
        </Button>{' '}
        <Link to={`/moive/${movie.id}/book`}>
          <Button variant='primary'>Book Movie</Button>
        </Link>
      </Card.Body>
      <Modal
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Trailer of {movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* eslint-disable-next-line react/iframe-missing-sandbox */}
          <iframe
            width='100%'
            height='400px'
            src={movie.trailer_video}
            title='Trailer'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
            sandbox='allow-scripts allow-popups allow-same-origin'
          />
        </Modal.Body>
      </Modal>
    </Card>
  )
}
const MovieList: React.FC<{ movies: SchemaMovie[] }> = ({ movies }) => (
  <Row>
    {movies.map(movie => (
      <Col key={movie.id}>
        <Movie movie={movie} />
      </Col>
    ))}
  </Row>
)

const RunningMovieList: React.FC<{ search: string }> = ({ search }) => {
  const { data, loading } = useRequest(
    async () => Backend.movie.v1MoviesList({ running: true, search }),
    { refreshDeps: [search], debounceWait: 200 }
  )
  return (
    !loading && (data?.data.data ? <MovieList movies={data.data.data} /> : null)
  )
}

const ComingMovieList: React.FC<{ search: string }> = ({ search }) => {
  const { data, loading } = useRequest(
    async () => Backend.movie.v1MoviesList({ running: false, search }),
    { refreshDeps: [search], debounceWait: 200 }
  )
  return (
    !loading && (data?.data.data ? <MovieList movies={data.data.data} /> : null)
  )
}

const Index: React.FC = () => {
  const [search, setSearch] = useState('')
  return (
    <PageContainer>
      <div className='text-center mb-3'>
        <h1>All Moives</h1>
        <p>
          Visit backend swagger: <a href='/swagger'>here</a>
        </p>
        <Form.Control
          type='text'
          placeholder='Search'
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <Row>
        <Col lg={6}>
          <div className='text-center mb-3'>
            <h1>Currently Running</h1>
          </div>
          <div className='movie-list-container'>
            <RunningMovieList search={search} />
          </div>
        </Col>
        <Col lg={6}>
          <div className='text-center mb-3'>
            <h1>Coming Soon</h1>
          </div>
          <div className='movie-list-container'>
            <ComingMovieList search={search} />
          </div>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default Index
