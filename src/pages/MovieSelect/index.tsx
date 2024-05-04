import { useRequest } from 'ahooks'
import type { SchemaMovie } from 'client'
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
  const { loading } = useRequest(
    async () => Backend.movie.v1MoviesDetail(movieId ?? ''),
    {
      onSuccess: res => {
        setMovie(res.data)
      }
    }
  )
  const showTimes = ['1:30 PM', '6:45 PM', '7:45 PM'] // TODO: load real show times
  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Showing</h1>
      </div>

      <div className='d-flex flex-wrap justify-content-around'>
        {loading ? null : (
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
                {showTimes.map((time, timeIndex) => (
                  <Button
                    key={timeIndex}
                    variant='primary'
                    className='mx-1 my-1'
                    onClick={() =>
                      navigate(`/movie/${movieId}/seat?show=${time}`)
                    }
                  >
                    {time}
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
