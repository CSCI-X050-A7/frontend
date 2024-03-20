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

const Index: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
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
            </Nav>
            <Nav>
              <span className='my-1 mx-0'>
                <Button
                  title='toggle theme'
                  style={{ color: 'inherit' }}
                  variant='link'
                  onClick={toggleTheme}
                >
                  <FontAwesomeIcon
                    size='lg'
                    icon={theme === 'dark' ? faSun : faMoon}
                  />
                </Button>
              </span>
              {user && user.is_admin ? (
                <NavDropdown title='Administration' className='my-1'>
                  <Link to='/admin/movie' className='dropdown-item'>
                    Manage Movies
                  </Link>
                  <Link to='/admin/promo' className='dropdown-item'>
                    Manage Promotions
                  </Link>
                  <Link to='/admin/user' className='dropdown-item'>
                    Manage Users
                  </Link>
                </NavDropdown>
              ) : null}
              {user ? (
                <>
                  <Link to='/profile/edit'>
                    <Button
                      type='button'
                      className='btn btn-link my-1 mx-0 mx-lg-1'
                    >
                      Profile
                    </Button>
                  </Link>
                  <Link to='/logout'>
                    <Button
                      type='button'
                      className='btn btn-danger my-1 mx-0 mx-lg-1'
                    >
                      Logout
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to={`/login?from=${location.pathname}`}>
                    <Button type='button' className='btn my-1 mx-0 mx-lg-1'>
                      Login
                    </Button>
                  </Link>
                  <Link to='/register'>
                    <Button
                      type='button'
                      className='btn btn-warning my-1 mx-0 mx-lg-1'
                    >
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Index
