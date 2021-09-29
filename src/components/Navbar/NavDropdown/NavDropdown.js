import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './NavDropdown.scss';

const NavDropdown = ({ category, subcategories }) => {
  return (
    <Container className="nav-dropdown">
      <Row className="p-2">
        {subcategories.map((subcategory, index) => (
          <Col
            as={Link}
            to={{
              pathname: '/products',
              search: `categories=${category}&subcategories=${subcategory.slug}`
            }}
            lg={3}
            className="nav-dropdown__item my-2"
            key={index}
          >{subcategory.name}</Col>
        ))}
      </Row>
    </Container>
  );
};

export default NavDropdown;