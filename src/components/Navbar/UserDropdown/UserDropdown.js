import React from 'react';
import { Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const UserDropdown = () => {
  const { pathname, search } = useLocation();
  const currentUrl = encodeURIComponent(pathname + search);

  return (
    <Container className="position-absolute top-25 p-3 nav-dropdown">
      <Link className="d-block mb-3" to="/profile">Profile</Link>
      <Link as={Link} to={`/logout?from=${currentUrl}`}>
        Logout
      </Link>
    </Container>
  );
};

export default UserDropdown;