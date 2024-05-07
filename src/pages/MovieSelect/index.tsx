import { useRequest } from 'ahooks'
import type { SchemaShow, SchemaMovie } from 'client'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import { Button, Card, Table, Row, Col, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const { movieId } = useParams()

  const [movie, setMovie] = useState<SchemaMovie>({
    id: '',
    title: '',
    category: '',
    producer: '',
    rating_code: '',
    reviews: '',
    director: '',
    synopsis: '',
    cast: '',
    trailer_picture: '',
    trailer_video: '',
    show_time: ''
  })
  const [shows, setShows] = useState<SchemaShow[]>([])
  const [selectedDate, setSelectedDate] = useState('')
  const { loading: loadingMovie } = useRequest(
    async () => Backend.movie.v1MoviesDetail(movieId ?? ''),
    {
      onSuccess: res => {
        setMovie(res.data)
      }
    }
  )
  const { loading: loadingShows } = useRequest(
    async () => Backend.movie.v1MoviesShowsDetail(movieId ?? ''),
    {
      onSuccess: res => {
        setShows(res.data.data ?? [])
      }
    }
  )
  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Showing</h1>
      </div>

      <div className='d-flex flex-wrap justify-content-around'>
        <Row>
          <Col>
            {loadingMovie ? null : (
              <Card style={{ width: '18rem' }}>
                <Card.Img
                  variant='top'
                  src={movie.trailer_picture}
                  alt={`${movie.title} poster`}
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>
                    <strong>Director:</strong> {movie.director}
                    <br />
                    <strong>Producer:</strong> {movie.producer}
                    <br />
                    <strong>Cast:</strong> {movie.cast}
                    <br />
                    <strong>Category:</strong> {movie.category}
                    <br />
                    <strong>Rating Code:</strong> {movie.rating_code}
                    <br />
                    <strong>Reviews:</strong> {movie.reviews}
                    <br />
                    <strong>Synopsis:</strong> {movie.synopsis}
                    <br />
                    <strong>Premiere Date:</strong>{' '}
                    {new Date(movie.show_time).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col>
            <Form.Group as={Row} controlId='datePicker'>
              <Form.Label column sm='2'>
                Date
              </Form.Label>
              <Col sm='10'>
                <Form.Control
                  type='date'
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                />
              </Col>
            </Form.Group>
            {loadingShows ? null : (
              <Table hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {shows
                    .filter(show => {
                      if (selectedDate === '') return true
                      console.log(
                        new Date(show.start_time).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          }
                        ),
                        new Date(selectedDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        })
                      )
                      return (
                        new Date(show.start_time).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          }
                        ) ===
                        new Date(selectedDate).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        })
                      )
                    })
                    .map((show, index) => (
                      <tr key={index}>
                        <td>
                          {new Date(show.start_time).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            }
                          )}
                        </td>
                        <td>
                          {new Date(show.start_time).toLocaleTimeString(
                            undefined,
                            {
                              hour: '2-digit',
                              minute: '2-digit'
                            }
                          )}
                        </td>
                        <td>{show.theater_location}</td>
                        <td>
                          <Button
                            variant='primary'
                            disabled={new Date(show.start_time) < new Date()}
                            onClick={() =>
                              navigate(`/movie/${movieId}/seat?show=${show.id}`)
                            }
                          >
                            Book
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </div>
    </PageContainer>
  )
}
export default Index
