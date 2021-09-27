import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './NavDropdown.scss';

import DUMMY_SUBCATEGORIES from '../../data/dummy-subcategories';

const NavDropdown = () => {
  return (
    <Container className="nav-dropdown">
      <Row className="p-2">
        {DUMMY_SUBCATEGORIES.map((subcategory, index) => (
          <Col
            as={Link}
            to={{
              pathname: '/products',
              search: `categories=cowok&subcategories=${subcategory.slug}`
            }}
            lg={3}
            className="nav-dropdown__item my-2"
            key={index}
          >{subcategory.name}</Col>
        ))}
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Blouse</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kaos</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kemeja</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Jumpsuit</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Blouse</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kaos</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kemeja</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Jumpsuit</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Blouse</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kaos</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Kemeja</Col>
        <Col as={Link} to="#" lg={3} className="nav-dropdown__item my-2">Jumpsuit</Col>
      </Row>
    </Container>
  );
};

export default NavDropdown;