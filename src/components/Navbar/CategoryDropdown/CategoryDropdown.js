import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './CategoryDropdown.scss';

import NavDropdown from '../NavDropdown/NavDropdown';

const CategoryDropdown = ({ category, subcategories }) => {
  return (
    <NavDropdown className="category-dropdown">
      <Row className="py-2 px-3">
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
    </NavDropdown>
  );
};

export default CategoryDropdown;