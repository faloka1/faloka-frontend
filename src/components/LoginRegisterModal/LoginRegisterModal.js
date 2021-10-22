import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './LoginRegisterModal.scss';

const LoginRegisterModal = ({ closeFunc, ...props }) => {

  const clickHandler = () => {

    if (closeFunc) {
      closeFunc();
    }
  };

  return (
    <Modal {...props}>
      <Modal.Header>
        <p className="brand text-center">FALOKA</p>
      </Modal.Header>
      <Modal.Body>
        <Button as={Link} className="w-100 text-center py-2 d-block" variant="primary" to="/login" onClick={clickHandler}>Login</Button>
        <p className="text-center my-3">atau</p>
        <Button as={Link} className="w-100 text-center py-2 d-block" variant="outline-primary" to="/register" onClick={clickHandler}>Register</Button>
      </Modal.Body>
    </Modal>
  );
};

export default LoginRegisterModal;