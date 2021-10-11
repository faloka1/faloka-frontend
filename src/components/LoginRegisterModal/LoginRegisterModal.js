import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginRegisterModal = ({ closeFunc, ...props }) => {

  const clickHandler = () => {

    if (closeFunc) {
      closeFunc();
    }
  };

  return (
    <Modal {...props}>
      <Modal.Body>
        <p className="h4 text-center mb-4">FALOKA</p>
        <Link className="w-100 btn-black text-center py-2 d-block mb-3 d-block" to="/login" onClick={clickHandler}>Login</Link>
        <p className="text-center">Atau</p>
        <Link className="w-100 btn-black btn-black--invert text-center py-2 d-block" to="/register" onClick={clickHandler}>Register</Link>
      </Modal.Body>
    </Modal>
  );
};

export default LoginRegisterModal;