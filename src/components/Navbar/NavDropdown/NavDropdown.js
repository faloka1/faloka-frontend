import React from 'react';
import { Container } from 'react-bootstrap';

import './NavDropdown.scss';

const NavDropdown = ({ children, centered, className }) => {
  let classes = 'nav-dropdown top-100';

  if (centered) {
    classes += ' start-50 translate-middle-x';
  } else {
    classes += ' start-0';
  }

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default NavDropdown;