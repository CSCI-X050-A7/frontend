import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useAuth } from 'hooks/useAuth'
import useTheme from 'hooks/useTheme'
import { NavDropdown } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
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
