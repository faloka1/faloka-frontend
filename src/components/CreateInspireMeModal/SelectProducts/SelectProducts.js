import React from 'react'
import { Modal, Form } from 'react-bootstrap';

import './SelectProducts.scss'

import { ReactComponent as CancelIcon } from '../../SVG/x.svg';
import CurrencyFormatter from '../../CurrencyFormatter/CurrencyFormatter';

const SelectProducts = ({ onDone, onCancel }) => {

  const cancelHandler = () => {
    onCancel();
  }

  const doneHandler = () => {
    onDone();
  };

  return (
    <>
      <Modal.Header className="d-flex align-items-center justify-content-between">
        <div className="btn" onClick={cancelHandler}>
          <CancelIcon />
        </div>
        <p className="mb-0 fs-5">Order</p>
        <div onClick={doneHandler} className="btn select-products__done fw-bold">Done</div>
      </Modal.Header>
      <Modal.Body>
        <Form.Check className="border d-flex align-items-center mb-2">
          <Form.Check.Label className="d-flex flex-grow-1">
            <img src="/assets/images/products/product_1.png" className="select-products__image me-3" alt="" />
            <div className="d-flex flex-column justify-content-center">
              <p className="text-muted">Baju bagus</p>
              <CurrencyFormatter value={30000} renderText={(value) => <p className="fs-4">{value}</p>} />
            </div>
          </Form.Check.Label>
          <Form.Check.Input type="checkbox" className="me-3" />
        </Form.Check>
        <Form.Check className="border d-flex align-items-center mb-2">
          <Form.Check.Label className="d-flex flex-grow-1">
            <img src="/assets/images/products/product_1.png" className="select-products__image me-3" alt="" />
            <div className="d-flex flex-column justify-content-center">
              <p className="text-muted">Baju bagus</p>
              <CurrencyFormatter value={30000} renderText={(value) => <p className="fs-4">{value}</p>} />
            </div>
          </Form.Check.Label>
          <Form.Check.Input type="checkbox" className="me-3" />
        </Form.Check>
        <Form.Check className="border d-flex align-items-center mb-2">
          <Form.Check.Label className="d-flex flex-grow-1">
            <img src="/assets/images/products/product_1.png" className="select-products__image me-3" alt="" />
            <div className="d-flex flex-column justify-content-center">
              <p className="text-muted">Baju bagus</p>
              <CurrencyFormatter value={30000} renderText={(value) => <p className="fs-4">{value}</p>} />
            </div>
          </Form.Check.Label>
          <Form.Check.Input type="checkbox" className="me-3" />
        </Form.Check>
      </Modal.Body>
    </>
  );
};

export default SelectProducts;