import { Container, Nav, Navbar, Image, Button } from 'react-bootstrap';
import { ROUTES } from '../../Routes';
import radioactive_logo from '/radioactive_logo_white.png'
import { FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NavigationBar.css'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { useEmail, useIsAuthenticated, userLogout } from '../../slices/userSlice';
import { setAtomicMassAction } from '../../slices/elementsSlice';
import { resetFiltersAction } from '../../slices/decaysSlice';

const NavigationBar: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const isAuthenticated = useIsAuthenticated()
  const email = useEmail()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(userLogout())
    dispatch(setAtomicMassAction(''))
    dispatch(resetFiltersAction())
    navigate(ROUTES.ELEMENTS, {replace: true})
  }

  return (
    <Navbar fixed="top" bg="dark" expand="lg" variant='dark' className='navBar'>
      <Container>
        <Link to={ROUTES.MAIN} className="navbar-brand navbar-text-white">
            <Image src={radioactive_logo} width={30} className='navbarImg'/>
            Распад
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={ROUTES.ELEMENTS} className="nav-link navbar-text-white navLink">
              Радиоактивные элементы
            </NavLink>
            {isAuthenticated && (
              <NavLink to={ROUTES.DECAYS} className="nav-link navbar-text-white navLink">
                Распады
              </NavLink>
            )}
          </Nav>
          {isAuthenticated && (
            <>
              <Link to={ROUTES.ACCOUNT}>
                <Button variant='link' className='text-decoration-none loginLogoutButtons'>{email}</Button>
              </Link>
              <Button variant='link' onClick={handleLogout} className='text-decoration-none loginLogoutButtons'>Выход</Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button variant='link' className='text-decoration-none loginLogoutButtons'>Вход</Button>
              </Link>
              <Link to={ROUTES.REGISTRATION}>
                <Button variant='link' className='text-decoration-none loginLogoutButtons'>Регистрация</Button>
              </Link>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;