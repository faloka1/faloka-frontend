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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Switch, Route, NavLink as RouterNavLink } from 'react-router-dom'

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import { HomeContext } from '../../context/HomeContext/HomeContext';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';

import DUMMY_CATEGORIES from '../../data/dummy-categories';
import useToggle from '../../hooks/use-toggle';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import UserDropdown from './UserDropdown/UserDropdown';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';

const Navbar = ({ categories }) => {
  const { setToggleOff, setToggleOn, toggle } = useToggle();
  const { category: currentCategory, setCategory, onHome } = useContext(HomeContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  categories = !!categories ? categories : DUMMY_CATEGORIES;

  const userClickHandler = () => {
    if (!isLoggedIn) {
      setToggleOn();
    }
  };

  return (
    <>
      <LoginRegisterModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <BootstrapNavbar fixed="top">
        <Container className="position-relative">
          <NavbarBrand as={Link} className="brand" to="/">FALOKA</NavbarBrand>
          <Switch>
            <Route exact path="/checkout/finish">
            </Route>
            <Route path="/checkout">
              <CheckoutProgressBar className="d-none d-lg-block" />
            </Route>
            <Route path="*">
              <Nav as="nav" className="me-auto flex-grow-1">
                <ul className="navbar-nav">
                  {categories.map(category => (
                    <li key={category.slug} className="nav-item-group category-filter">
                      <Link
                        to="/"
                        onClick={() => setCategory(category.slug)}
                        className={`${category.slug === currentCategory && onHome ? 'active' : ''}`}
                      >
                        {category.name}
                      </Link>
                      {category.sub_categories.length > 0 && <CategoryDropdown category={category.slug} subcategories={category.sub_categories} />}
                    </li>
                  ))}
                  <li className="nav-item-group">
                    <RouterNavLink to="/mix-and-match" className="text-accent mixmatch" activeClassName="active">
                      Mixmatch
                    </RouterNavLink>
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
                  <li className="nav-item nav-item-group dropdown position-relative">
                    <NavLink as={Link} to="#">
                      <UserIcon onClick={userClickHandler} className="icon" />
                    </NavLink>
                    {isLoggedIn && <UserDropdown />}
                  </li>
                </ul>
              </Nav>
            </Route>
          </Switch>
        </Container>
      </BootstrapNavbar >
    </>
  );
};

export default Navbar;