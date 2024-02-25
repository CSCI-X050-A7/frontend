import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'

const Index: React.FC = () => {
  const navigate = useNavigate()
  const [movieTitle, setMovieTitle] = useState('my movie')
  const [hoveredMovie, setHoveredMovie] = useState<string | null>(null);

  const handleMouseEnter = (title: string) => {
    setHoveredMovie(title);
  };

  const handleMouseLeave = () => {
    setHoveredMovie(null);
  };


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
  const movies = [
    {
      title: 'Argylle',
      director: 'Matthew Vaughn',
      length: '2h 30m',
      image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00003984', // Replace with actual image URL
      showTimes: ['10:00 AM', '2:00 PM', '6:00 PM', '9:30 PM'],
    },
    {
      title: 'Bob Marley One Love',
      director: 'Reinaldus Marcus ',
      length: '2h',
      image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00004017', // Replace with actual image URL
      showTimes: ['11:00 AM', '3:45 PM', '8:00 PM'],
    },
    {
      title: 'Madame Web',
      director: 'S.J. Clarkson',
      length: '1h 45m',
      image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00004029', // Replace with actual image URL
      showTimes: ['5:45 PM', '8:00 PM'],
    },
    {
      title: 'Wonka',
      director: 'Paul King',
      length: '2h 15m',
      image: 'https://connect.gtcmovies.com/CDN/Image/Entity/FilmPosterGraphic/HO00003932', // Replace with actual image URL
      showTimes: ['1:30 PM', '6:45 PM', '7:45 PM' ],
    },
  ];
  
  return (
    <PageContainer>
      <div className='text-center'>
        <h1>Showing</h1>
      </div>

      <div className='d-flex flex-wrap justify-content-around'>
        {movies.map((movie, index) => (
          <Card
            key={index}
            style={{ width: '18rem', margin: '10px' }}
            onMouseEnter={() => handleMouseEnter(movie.title)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Img variant='top' src={movie.image} alt={`${movie.title} poster`} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>
                <strong>Director:</strong> {movie.director}
                <br />
                <strong>Length:</strong> {movie.length}
              </Card.Text>
              {hoveredMovie === movie.title && (
                <div>
                  {movie.showTimes.map((time, timeIndex) => (
                    <Button
                      key={timeIndex}
                      variant='primary'
                      className='mt-auto'
                      style={{ marginRight: '8px', marginBottom: '8px' }} 

                      onClick={() => navigate('/selectSeat')}
                      >
                        {time}
                    </Button>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};
export default Index
