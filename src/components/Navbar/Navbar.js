import {
  Container,
  Navbar as BootstrapNavbar, Nav, NavLink, NavbarBrand,
  Form, FormControl
} from 'react-bootstrap';
import {
  NavLink as RouterNavLink,
  Link,
} from 'react-router-dom';

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as BagIcon } from '../SVG/shopping-bag.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import NavDropdown from './NavDropdown/NavDropdown';
import CounterBadge from './CounterBadge/CounterBadge';

const Navbar = () => {
  return (
    <BootstrapNavbar fixed="top">
      <Container>
        <NavbarBrand as={Link} className="brand" to="/">FALOKA</NavbarBrand>
          <Nav as="nav" className="me-auto category-filter flex-grow-1">
            <ul className="navbar-nav">
              <li className="nav-item-group">
                <NavLink as={RouterNavLink} to="#">Cewek</NavLink>
                <NavDropdown />
              </li>
              <li className="nav-item-group">
                <NavLink as={RouterNavLink} to="#">Cowok</NavLink>
                <NavDropdown />
              </li>
              <li className="nav-item-group">
                <NavLink as={RouterNavLink} to="#">Atasan</NavLink>
                <NavDropdown />
              </li>
              <li className="nav-item-group">
                <NavLink as={RouterNavLink} to="#">Bawahan</NavLink>
                <NavDropdown />
              </li>
            </ul>
          </Nav>
        <Form className="d-flex search-input">
          <FormControl type="text" placeholder="Search" />
          <div className="search-icon">
            <SearchIcon className="icon" />
          </div>
        </Form>
        <Nav className="header__menu ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <NavLink as={Link} to="#">
                <UserIcon className="icon" />
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink as={Link} to="#">
                <BagIcon className="icon" />
                <CounterBadge count={5} />
              </NavLink>
            </li>
          </ul>
        </Nav>
      </Container >
    </BootstrapNavbar >
  );
};

export default Navbar;