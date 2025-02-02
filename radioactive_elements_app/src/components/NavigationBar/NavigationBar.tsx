import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { ROUTES } from '../../Routes';
import radioactive_logo from '../../assets/radioactive_logo.png'
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './NavigationBar.css'

const NavigationBar: FC = () => {
  return (
    <Navbar fixed="top" bg="dark" expand="lg" variant='dark'>
      <Container>
        <Link to={ROUTES.MAIN} className="navbar-brand navbar-text-white">
            <Image src={radioactive_logo} width={30} className='navbarImg'/>
            Распад
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={ROUTES.ELEMENTS} className="nav-link navbar-text-white">
              Радиоактивные элементы
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;