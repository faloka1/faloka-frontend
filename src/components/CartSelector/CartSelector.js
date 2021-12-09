import React from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../stores/cart/cart-slice';
import { deleteItem, updateQuantity } from '../../stores/cart/cart-actions';

import './CartSelector.scss';

import CartItem from '../CartItem/CartItem';
import groupCartItem from '../../helpers/group-cart-item';

const CartSelector = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const grouped = groupCartItem(items);

  const quantityChangeHandler = (cart_id, quantity) => {
    dispatch(updateQuantity(cart_id, quantity));
  };

  const itemCheckedHandler = (product_id, variant_id, checked) => {
    dispatch(cartActions.updateCheck({ product_id, variant_id, checked }));
  };

  const deleteItemHandler = (cart_id) => {
    dispatch(deleteItem(cart_id));
  };

  const brandCheckedHandler = (event, brand_slug) => {
    const filteredItem = items.filter(item => item.brand.slug === brand_slug);

    filteredItem.forEach(item => {
      const {
        product_id,
        variant_id
      } = item;

      dispatch(cartActions.updateCheck({ product_id, variant_id, checked: event.target.checked }));
    });
  };

  const checkAllHandler = (event) => {
    items.forEach(item => {
      const {
        product_id,
        variant_id
      } = item;

      dispatch(cartActions.updateCheck({ product_id, variant_id, checked: event.target.checked }));
    });
  };

  return (
    <>
      <Form.Check
        inline
        label="Pilih Semua"
        type='checkbox'
        className="d-block border-bottom pb-2"
        checked={items.every(item => item.checked)}
        onChange={checkAllHandler}
      />
      {grouped.map(g => (
        <div key={g.slug} className="mb-4">
          <Form.Check
            inline
            type='checkbox'
            className="d-block my-3">
            <Form.Check.Input
              type="checkbox"
              className="me-2"
              checked={g.items.every(item => item.checked)}
              onChange={(event) => brandCheckedHandler(event, g.slug)}
            />
            <Form.Check.Label>
              <p className="fw-bold mb-0">{g.name}</p>
            </Form.Check.Label>
          </Form.Check>
          {g.items.map((item) =>
            <CartItem
              key={item.name}
              className="my-2"
              cartData={item}
              onQuantityChange={quantityChangeHandler.bind(null, item.id)}
              onChecked={itemCheckedHandler.bind(null, item.product_id, item.variant_id)}
              onDeleteHandler={deleteItemHandler.bind(null, item.id)}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default CartSelector;
