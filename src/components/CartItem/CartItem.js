import React from 'react';
import { Form } from 'react-bootstrap';
import InputSpinner from 'react-bootstrap-input-spinner';

import './CartItem.scss';

import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

const CartItem = ({ className }) => {
  let classes = 'd-flex align-items-center cart-item';

  if (className) {
    classes += ' ' + className;
  }

  return (
    <Form.Check type="checkbox" className={classes}>
      <Form.Check.Input type="checkbox" className="me-2" />
      <Form.Check.Label className="cart-item__content d-flex flex-grow-1">
        <img src="/assets/images/products/product_1.png" alt="product" />
        <div className="d-flex flex-column flex-md-row justify-content-between ms-2 flex-grow-1 align-items-baseline align-items-md-center">
          <div className="d-flex flex-column justify-content-center">
            <p>Kemeja Santuy Murah</p>
            <p className="fw-bold"><span className="text-gray fw-normal">Ukuran</span>: S</p>
          </div>
          <CurrencyFormatter value={13000} renderText={value => <p>{value}</p>} />
          <div className="cart-item__spinner">
            <InputSpinner type="int" min={1} variant={'primary'} value={1} onChange={num => console.log(num)} size="sm" />
          </div>
        </div>
      </Form.Check.Label>
    </Form.Check>
  );
};

export default CartItem;