import { useContext, useState } from 'react';
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  NavLink,
  NavbarBrand,
  Form,
  FormControl,
  InputGroup,
  Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom'

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import { HomeContext } from '../../context/HomeContext/HomeContext';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';

import DUMMY_CATEGORIES from '../../data/dummy-categories';
import useToggle from '../../hooks/use-toggle';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import SearchModal from '../SearchModal/SearchModal';
import UserDropdown from './UserDropdown/UserDropdown';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';

const Navbar = ({ categories }) => {
  const { setToggleOff, setToggleOn, toggle } = useToggle();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <SearchModal show={show} onHide={handleClose} closeFunc={handleClose} centered />
      <LoginRegisterModal className="auth-modal" show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <BootstrapNavbar fixed="top" expand="lg">
        <Container className="position-relative">
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBrand as={Link} className="brand" to="/">FALOKA</NavbarBrand>
          <Nav className="navbar-right d-flex order-lg-1">
            <ul className="navbar-nav">
              <li className="nav-item-group">
                <NavLink as={Link} to="#" className="d-block d-lg-none">
                  <SearchIcon onClick={handleShow} className="icon" />
                </NavLink>
                <div className="d-none d-lg-block">
                  <Form className="d-flex search-input">
                    <InputGroup>
                        <Button variant="primary" className="search-icon">
                          <SearchIcon className="icon" />
                        </Button>
                        <FormControl type="text" placeholder="Search" />
                    </InputGroup>
                  </Form>
                </div> 
              </li>
              <li className="nav-item-group">
                <NavLink as={Link} to="#">
                  <UserIcon onClick={userClickHandler} className="icon" />
                </NavLink>
                {isLoggedIn && <UserDropdown />}
              </li>
            </ul>
          </Nav>
          <Switch>
            <Route exact path="/checkout/finish">
            </Route>
            <Route path="/checkout">
              <CheckoutProgressBar className="d-none d-lg-block" />
            </Route>
            <Route path="*">
              <BootstrapNavbar.Collapse id="basic-navbar-nav">
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
                      {category.sub_categories.length > 0 && <CategoryDropdown category={category.slug} subcategories={category.sub_categories} />}
                    </li>
                  ))}
                </ul>
              </Nav>
              </BootstrapNavbar.Collapse>
            </Route>
          </Switch>
        </Container>
      </BootstrapNavbar >
    </>
  );
};

export default Navbar;