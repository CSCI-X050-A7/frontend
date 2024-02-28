import { useRequest } from 'ahooks'
import PageContainer from 'components/PageContainer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import Backend from 'utils/service'
import { Col, Modal, Row } from 'react-bootstrap'
import type { SchemaMovie } from 'client'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

interface LeftHalfProps {
  // Props
}

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
        </Card.Text>
        <Link to={`/movie/${movie.id}/book`}>
          <Button variant='primary'>Edit</Button>
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

const SearchList: React.FC<{ search: string }> = ({ search }) => {
  const { data, loading } = useRequest(
    async () => Backend.movie.v1MoviesList({ running: true, search }),
    { refreshDeps: [search], debounceWait: 200 }
  )
  return (
    !loading && (data?.data.data ? <MovieList movies={data.data.data} /> : null)
  )
}

const LeftHalf: React.FC<LeftHalfProps> = () => {
  const [search, setSearch] = useState('');
  const [showEditPopup, setShowEditPopup] = useState(false);

  const handleEditClick = () => {
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  return (
    <div style={{ width: '50%', padding: '20px' }}>
      <div style={{display:'flex'}}>
        <h2>Edit Movie</h2>
        <Button variant="primary" onClick={handleEditClick} style={{marginLeft:'210px'}}> {/* Only here due to a lack of backend functionality!!! */}
          Edit
        </Button>
      </div>
      
      <Modal show={showEditPopup} onHide={handleCloseEditPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: 'flex', paddingRight: '390px', justifyContent: 'center', alignItems: 'center' }}>
          <RightHalf />
        </Modal.Body>
      </Modal>

      <div style={{ padding: '10px' }} className="text-center mb-3">
        <Form.Control
          style={{width:'400px'}}
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <SearchList search={search} />
        
      </div>
    </div>
  );
};


interface RightHalfProps {
  // Props
}

const RightHalf: React.FC<RightHalfProps> = () => {
  const navigate = useNavigate();
  const [movieTitle, setMovieTitle] = useState('');
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
  );

  return (
    <div style={{ width: '50%', paddingTop: '10px' }}>
      <Card style={{width: '400px'}}>
        <Card.Body>
          <Card.Title>Movie Details</Card.Title>
          <Form>
            <ListGroup className="mb-3" style={{}}>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Movie Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Movie title"
                  value={movieTitle}
                  onChange={(e) => setMovieTitle(e.target.value)}
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Add cast members</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Cast member"
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Category"
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Director</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Director"
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Producer</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Producer"
                />
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '5px 0', border: 'none' }}>
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Rating code"
                />
              </ListGroup.Item>
            </ListGroup>
            <Button
              variant="primary"
              type="button"
              onClick={create}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <PageContainer>
      <div style={{ display: 'flex' }}>
        <LeftHalf />
        <div style={{ display: 'flex', flexDirection:'column', padding:'20px' }}>
          <h2>Add Movie</h2>
          <RightHalf />
        </div>
      </div>
    </PageContainer>
  );
}

export default Index
