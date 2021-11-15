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
import { Switch, Route, NavLink as RouterNavLink } from 'react-router-dom';

import './Navbar.scss';

import { ReactComponent as UserIcon } from '../SVG/user.svg';
import { ReactComponent as CartIcon } from '../SVG/shopping-bag.svg';
import { ReactComponent as SearchIcon } from '../SVG/search.svg';
import { HomeContext } from '../../context/HomeContext/HomeContext';
import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';

import DUMMY_CATEGORIES from '../../data/dummy-categories';
import useToggle from '../../hooks/use-toggle';
import LoginRegisterModal from '../LoginRegisterModal/LoginRegisterModal';
import SearchModal from '../SearchModal/SearchModal';
import UserDropdown from './UserDropdown/UserDropdown';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import CounterBadge from './CounterBadge/CounterBadge';

const Navbar = ({ categories }) => {
  const { setToggleOff, setToggleOn, toggle } = useToggle();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { category: currentCategory, setCategory, onHome, openInspireMe } = useContext(HomeContext);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  categories = !!categories ? categories : DUMMY_CATEGORIES;

  const userClickHandler = () => {
    if (!isLoggedIn) {
      setToggleOn();
    }
  };

  const createInspireMeOpenHandler = () => {
    if (isLoggedIn) {
      openInspireMe();
    } else {
      setToggleOn();
    }
  };

  return (
    <>
      <SearchModal show={show} onHide={handleClose} centered />
      <LoginRegisterModal className="auth-modal" show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <BootstrapNavbar fixed="top" expand="xl">
        <Container className="position-relative">
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarBrand as={Link} className="brand" to="/">FALOKA</NavbarBrand>
          <Nav className="navbar-right d-flex order-lg-1">
            <ul className="navbar-nav">
              <Switch>
                <Route path="/inspiration">
                  <li className="nav-item-group nav-item-right">
                    <button onClick={createInspireMeOpenHandler} className="btn btn-black px-4 rounded-0">Share outfitmu</button>
                  </li>
                  <li className="nav-item-group nav-item-right">
                    <NavLink as={Link} to="#">
                      <UserIcon onClick={userClickHandler} className="icon" />
                    </NavLink>
                    {isLoggedIn && <UserDropdown />}
                  </li>
                </Route>
                <Route path="/checkout">
                </Route>
                <Route path="*">
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
                  <li className="nav-item-group nav-item-right">
                    <Link to="/inspiration">Inspo</Link>
                  </li>
                  <li className="nav-item-group nav-item-right">
                    <NavLink as={Link} to="#">
                      <UserIcon onClick={userClickHandler} className="icon" />
                    </NavLink>
                    {isLoggedIn && <UserDropdown />}
                  </li>
                  <li className="nav-item-group nav-item-right">
                    <NavLink as={Link} to="/cart" className="ps-0">
                      <CartIcon className="icon ps-0" />
                      {!!cartQuantity && <CounterBadge count={cartQuantity} />}
                    </NavLink>
                  </li>
                </Route>
              </Switch>
            </ul>
          </Nav>
          <Switch>
            <Route exact path="/checkout/finish">
            </Route>
            <Route path="/checkout">
              <CheckoutProgressBar className="d-none d-lg-block" />
            </Route>
            <Route path="/inspiration">
            </Route>
            <Route path="*">
              <BootstrapNavbar.Collapse id="basic-navbar-nav">
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
              </BootstrapNavbar.Collapse>
            </Route>
          </Switch>
        </Container>
      </BootstrapNavbar >
    </>
  );
};

export default Navbar;