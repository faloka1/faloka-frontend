import {
  Navbar as BootstrapNavbar,
  NavbarBrand,
  Container,
  Nav,
  NavLink,
  FormControl,
} from 'react-bootstrap';
import {
  NavLink as RouterNavLink,
  Link,
} from 'react-router-dom';

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as HeartIcon } from '../SVG/heart.svg';
import { ReactComponent as BagIcon } from '../SVG/shopping-bag.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import CounterBadge from './CounterBadge/CounterBadge';

const Navbar = () => {
  return (
    <BootstrapNavbar as="header" className="header">
      <Container>
        <NavbarBrand as={Link} to="/" className="brand">Faloka</NavbarBrand>
        <Nav as="nav" className="category-filter">
          <NavLink as={RouterNavLink} to="#">Cowok</NavLink>
          <NavLink as={RouterNavLink} to="#">Cewek</NavLink>
          <NavLink as={RouterNavLink} to="#">Atasan</NavLink>
          <NavLink as={RouterNavLink} to="#">Bawahan</NavLink>
          <NavLink as={RouterNavLink} to="#">Sale</NavLink>
          <NavLink className="inspire-me" as={RouterNavLink} to="#">Inspire me</NavLink>
        </Nav>
        <div className="search-input">
          <FormControl type="text" placeholder="Search" />
          <div className="search-icon">
            <SearchIcon className="icon" />
          </div>
        </div>
        <Nav className="header__menu">
          <NavLink as={Link} to="#">
            <UserIcon className="icon" />
          </NavLink>
          <NavLink as={Link} to="#">
            <CounterBadge count={5} />
            <HeartIcon />
          </NavLink>
          <NavLink as={Link} to="#">
            <CounterBadge count={20} />
            <BagIcon className="icon" />
          </NavLink>
        </Nav>
      </Container >
    </BootstrapNavbar >
  );
};

/* const Navbar = () => {
  return (
    <BootstrapNavbar as="header" className="header">
      <Container>
        <NavbarBrand as={Link} to="/" className="brand">Faloka</NavbarBrand>
        <Nav as="nav" className="category-filter">
          <NavLink as={RouterNavLink} to="#">Cowok</NavLink>
          <NavLink as={RouterNavLink} to="#">Cewek</NavLink>
          <NavLink as={RouterNavLink} to="#">Atasan</NavLink>
          <NavLink as={RouterNavLink} to="#">Bawahan</NavLink>
          <NavLink as={RouterNavLink} to="#">Sale</NavLink>
          <NavLink className="inspire-me" as={RouterNavLink} to="#">Inspire me</NavLink>
        </Nav>
        <div className="search-input">
          <FormControl type="text" placeholder="Search" />
          <div className="search-icon">
            <SearchIcon className="icon" />
          </div>
        </div>
        <Nav className="header__menu">
          <NavLink as={Link} to="#">
            <UserIcon className="icon" />
          </NavLink>
          <NavLink as={Link} to="#">
            <CounterBadge count={5} />
            <HeartIcon />
          </NavLink>
          <NavLink as={Link} to="#">
            <CounterBadge count={20} />
            <BagIcon className="icon" />
          </NavLink>
        </Nav>
      </Container >
    </BootstrapNavbar >
  );
}; */

export default Navbar;