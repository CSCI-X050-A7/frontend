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
    <Card className='mb-3'>
      <Card.Img variant='top' src={movie.trailer_picture} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>
          <p>Rating: {movie.rating_code}</p>
          <Card.Link href='#' onClick={handleShow}>
            Watch Trailer
          </Card.Link>
        </Card.Text>
        <Link to={`/movie/${movie.id}/book`}>
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
      <Col key={movie.id} xs={12} sm={6} xl={4}>
        <Movie movie={movie} />
      </Col>
    ))}
  </Row>
)

const RunningMovieList: React.FC<{
  search: string
  category: string
  showTime: string
}> = ({ search, category, showTime }) => {
  const { data, loading } = useRequest(
    async () =>
      Backend.movie.v1MoviesList({ running: true, search, category, showTime }),
    { refreshDeps: [search, category], debounceWait: 200 }
  )
  return (
    !loading && (data?.data.data ? <MovieList movies={data.data.data} /> : null)
  )
}

const ComingMovieList: React.FC<{
  search: string
  category: string
  showTime: string
}> = ({ search, category, showTime }) => {
  const { data, loading } = useRequest(
    async () =>
      Backend.movie.v1MoviesList({
        running: false,
        search,
        category,
        showTime
      }),
    { refreshDeps: [search, category, showTime], debounceWait: 200 }
  )
  return (
    !loading && (data?.data.data ? <MovieList movies={data.data.data} /> : null)
  )
}

const Index: React.FC = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [showTime, setShowTime] = useState('')
  return (
    <PageContainer>
      <div className='text-center mb-3'>
        <h1>All movies</h1>
        <p>
          Visit backend swagger: <a href='/swagger'>here</a>
        </p>
        <Row>
          <Col>
            <Form.Control
              type='text'
              placeholder='Search'
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col lg={2} xs={12}>
            <Form.Select
              defaultValue='Category'
              onChange={e => setCategory(e.target.value)}
            >
              <option>All genres</option>
              <option>Action</option>
              <option>Romance</option>
              <option>Fantasy</option>
              <option>Drama</option>
              <option>Comedy</option>
              <option>Horror</option>
              <option>Adventure</option>
              <option>Science Fiction</option>
              <option>Family</option>
              <option>Animation</option>
              <option>Thriller</option>
              <option>Crime</option>
              <option>Mystery</option>
              <option>Documentary</option>
              <option>Music</option>
            </Form.Select>
          </Col>
          <Col lg={3} xs={12}>
            <Form.Control
              type='date'
              placeholder='Show Time'
              defaultValue={showTime}
              onChange={e => {
                setShowTime(e.target.value)
              }}
            />
          </Col>
        </Row>
      </div>
      <Row>
        <Col lg={6}>
          <div className='text-center mb-3'>
            <h1>Currently Running</h1>
          </div>
          <div className='movie-list-container'>
            <RunningMovieList
              search={search}
              category={category}
              showTime={showTime}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div className='text-center mb-3'>
            <h1>Coming Soon</h1>
          </div>
          <div className='movie-list-container'>
            <ComingMovieList
              search={search}
              category={category}
              showTime={showTime}
            />
          </div>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default Index
