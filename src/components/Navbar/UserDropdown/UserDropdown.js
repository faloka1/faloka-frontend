import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './UserDropdown.scss';

import NavDropdown from '../NavDropdown/NavDropdown';

const UserDropdown = () => {
  const { pathname, search } = useLocation();
  const currentUrl = encodeURIComponent(pathname + search);

  return (
    <NavDropdown className="user-dropdown text-center" centered>
      {/* <Link className="d-block mb-3 text-center" to="/user/profile">Profile</Link> */}
      <Link className="d-block mb-3 text-center" to="/user/transaction">Transaction</Link>
      <Link as={Link} to={`/logout?from=${currentUrl}`}>
        Logout
      </Link>
    </NavDropdown >
  );
};

export default UserDropdown;