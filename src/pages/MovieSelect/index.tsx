import { useRequest } from 'ahooks'
import type { SchemaShow, SchemaMovie } from 'client'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
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
              </Card.Text>
              <div>
                {loadingShows
                  ? null
                  : shows.map((show, index) => (
                      <Button
                        key={index}
                        variant='primary'
                        className='mx-1 my-1'
                        onClick={() =>
                          navigate(`/movie/${movieId}/seat?show=${show.id}`)
                        }
                      >
                        {`${new Date(show.start_time).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            day: 'numeric'
                          }
                        )}, ${new Date(show.start_time).toLocaleTimeString(
                          undefined,
                          {
                            hour: '2-digit',
                            minute: '2-digit'
                          }
                        )} - ${show.theater_location}`}
                      </Button>
                    ))}
              </div>
            </Card.Body>
          </Card>
        )}
      </div>
    </PageContainer>
  )
}
export default Index
