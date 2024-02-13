import { useAuth } from 'hooks/useAuth'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, useLocation } from 'react-router-dom'
import { initTheme, toggleTheme } from 'utils/theme'

initTheme()

const Index: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()
  return (
    <header className='border-bottom'>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container fluid>
          <Navbar.Brand>Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id='navbarScroll'>
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link className='nav-link' to='/'>
                Home
              </Link>
              <Link className='nav-link' to='/create'>
                Create
              </Link>
            </Nav>
            <Nav>
              <Button
                type='button'
                className='btn my-2 my-sm-0 mx-1'
                variant='outline-secondary'
                onClick={() => {
                  toggleTheme()
                }}
              >
                Toggle Theme
              </Button>
              {user ? (
                <Link to='/logout'>
                  <Button
                    type='button'
                    className='btn btn-danger my-2 my-sm-0 mx-1'
                  >
                    Logout
                  </Button>
                </Link>
              ) : (
                <Link to={`/login?from=${location.pathname}`}>
                  <Button type='button' className='btn my-2 my-sm-0 mx-1'>
                    Login
                  </Button>
                </Link>
              )}
              <Link to='/register'>
                <Button
                  type='button'
                  className='btn btn-warning my-2 my-sm-0 mx-1'
                >
                  Register
                </Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Index
