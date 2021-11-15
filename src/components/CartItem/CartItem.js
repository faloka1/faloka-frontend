import React from 'react';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InputSpinner from 'react-bootstrap-input-spinner';

import './CartItem.scss';

import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import { ReactComponent as TrashBinIcon } from '../SVG/trash-bin.svg';

const CartItem = ({ className, cartData, onQuantityChange, onChecked, onDeleteHandler }) => {
  const {
    name,
    size,
    price,
    image,
    quantity,
    checked,
    slug
  } = cartData;
  let classes = 'd-flex align-items-center cart-item';

  if (className) {
    classes += ' ' + className;
  }

  const quantityChangeHandler = (quantity) => {
    onQuantityChange(quantity);
  };

  const onCheckedHandler = (event) => {
    onChecked(event.target.checked)
  };

  const deleteHandler = (event) => {
    onDeleteHandler();
  };

  return (
    <Form.Check type="checkbox" className={classes}>
      <Form.Check.Input type="checkbox" className="me-2" checked={checked} onChange={onCheckedHandler} />
      <Form.Check.Label className="cart-item__content d-flex flex-grow-1">
        <img src={image} alt="product" />
        <div className="d-flex flex-column flex-md-row justify-content-between ms-3 flex-grow-1 align-items-baseline align-items-md-center">
          <div className="d-flex flex-column justify-content-center">
            <Link to={`/p/${slug}`} className="mb-2">{name}</Link>
            <p className="fw-bold"><span className="text-gray fw-normal">Ukuran</span>: {size}</p>
          </div>
          <CurrencyFormatter value={price} renderText={value => <p className="fw-bold">{value}</p>} />
          <div className="d-flex align-items-center">
            <div className="cart-item__spinner">
              <InputSpinner type="int" min={1} variant={'primary'} value={quantity} onChange={num => quantityChangeHandler(num)} size="sm" />
            </div>
            <TrashBinIcon className="icon cart-item__delete-btn flex-grow-0 ms-2" onClick={deleteHandler} />
          </div>
        </div>
      </Form.Check.Label>
    </Form.Check>
  );
};

export default CartItem;