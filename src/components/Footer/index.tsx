
import Container from 'react-bootstrap/Container'
import { Link, useLocation } from 'react-router-dom'

const Index: React.FC = () => (
  <footer className='footer mt-auto py-3 bg-body-tertiary'>
    <Container fluid>
    
      <div className='text-center'>
      <Link to="/selectMovie" className='btn btn-primary my-2'>
        Go to Select Movies
      </Link>
    </div>
    </Container>
  </footer>
)

export default Index
