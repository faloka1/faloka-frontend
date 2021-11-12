import React from 'react';
import { Form } from 'react-bootstrap';

import './CartSelector.scss';

import CartItem from '../CartItem/CartItem';

const CartSelector = () => {
  return (
    <>
      <Form.Check
        inline
        label="Pilih Semua"
        type='checkbox'
        className="d-block border-bottom pb-2"
      />
      <div className="mb-4">
        <Form.Check
          inline
          type='checkbox'
          className="d-block my-3">
          <Form.Check.Input type="checkbox" className="me-2" />
          <Form.Check.Label>
            <p className="fw-bold mb-0">Brand Indo Kesukaan Masyarakat</p>
          </Form.Check.Label>
        </Form.Check>
        {[...Array(3)].map((x, i) =>
          <CartItem key={x} className="my-2" />
        )}
      </div>
      <div className="mb-4">
        <Form.Check
          inline
          type='checkbox'
          className="d-block my-3">
          <Form.Check.Input type="checkbox" className="me-2" />
          <Form.Check.Label>
            <p className="fw-bold mb-0">Brand Keren Surabaya</p>
          </Form.Check.Label>
        </Form.Check>
        {[...Array(3)].map((x, i) =>
          <CartItem key={x} className="my-2" />
        )}
      </div>
    </>
  )
}

export default CartSelector;
