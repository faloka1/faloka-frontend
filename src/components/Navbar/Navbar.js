import { useContext } from 'react';
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  NavLink,
  NavbarBrand,
  Form,
  FormControl
} from 'react-bootstrap';
import {
  Link,
  useLocation
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as BagIcon } from '../SVG/shopping-bag.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import NavDropdown from './NavDropdown/NavDropdown';
import CounterBadge from './CounterBadge/CounterBadge';
import { HomeContext } from '../../context/HomeContext/HomeContext';

import DUMMY_CATEGORIES from '../../data/dummy-categories';

const Navbar = ({ categories }) => {
  const { category: currentCategory, setCategory, onHome } = useContext(HomeContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const { pathname, search } = useLocation();
  const currentUrl = encodeURIComponent(pathname + search);
  categories = !!categories ? categories : DUMMY_CATEGORIES;

  return (
    <BootstrapNavbar fixed="top">
      <Container>
        <NavbarBrand as={Link} className="brand" to="/">FALOKA</NavbarBrand>
        <Nav as="nav" className="me-auto category-filter flex-grow-1">
          <ul className="navbar-nav">
            {categories.map(category => (
              <li key={category.slug} className="nav-item-group">
                <Link
                  to="/"
                  onClick={() => setCategory(category.slug)}
                  className={`${category.slug === currentCategory && onHome ? 'active' : ''}`}
                >
                  {category.name}
                </Link>
                {category.sub_categories.length > 0 && <NavDropdown category={category.slug} subcategories={category.sub_categories} />}
              </li>
            ))}
          </ul>
        </Nav>
        <Form className="d-flex search-input">
          <FormControl type="text" placeholder="Search" />
          <div className="search-icon">
            <SearchIcon className="icon" />
          </div>
        </Form>
        <Nav className="header__menu ml-auto">
          {isLoggedIn &&
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
              <li className="nav-item dropdown">
                <NavLink as={Link} to={`/logout?from=${currentUrl}`}>
                  Logout
                </NavLink>
              </li>
            </ul>
          }
          {!isLoggedIn && <NavLink as={Link} to="/login">Login</NavLink>}
        </Nav>
      </Container >
    </BootstrapNavbar >
  );
};

export default Navbar;