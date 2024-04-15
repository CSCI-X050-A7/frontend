import PageContainer from 'components/PageContainer'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useNavigate, useParams } from 'react-router-dom'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const { movieId } = useParams()

  const movies = [
    {
      title: 'Argylle',
      director: 'Matthew Vaughn',
      length: '2h 30m',
      image:
        'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00003984', // Replace with actual image URL
      showTimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM']
    }
    // {
    //   title: 'Bob Marley One Love',
    //   director: 'Reinaldus Marcus ',
    //   length: '2h',
    //   image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00004017', // Replace with actual image URL
    //   showTimes: ['11:00 AM', '3:45 PM', '8:00 PM'],
    // },
    // {
    //   title: 'Madame Web',
    //   director: 'S.J. Clarkson',
    //   length: '1h 45m',
    //   image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00004029', // Replace with actual image URL
    //   showTimes: ['5:45 PM', '8:00 PM'],
    // },
    // {
    //   title: 'Wonka',
    //   director: 'Paul King',
    //   length: '2h 15m',
    //   image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00003932', // Replace with actual image URL
    //   showTimes: ['1:30 PM', '6:45 PM', '7:45 PM' ],
    // },
  ]

  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Showing</h1>
      </div>

      <div className='d-flex flex-wrap justify-content-around'>
        {movies.map((movie, index) => (
          <Card key={index} style={{ width: '18rem', margin: '10px' }}>
            <Card.Img
              variant='top'
              src={movie.image}
              alt={`${movie.title} poster`}
            />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <strong>Director:</strong> {movie.director}
                <br />
                <strong>Length:</strong> {movie.length}
              </Card.Text>
              <div>
                {movie.showTimes.map((time, timeIndex) => (
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
        ))}
      </div>
    </PageContainer>
  )
}
export default Index
