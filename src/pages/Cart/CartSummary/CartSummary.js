import React from 'react';
import { useSelector } from 'react-redux';

import ShoppingPriceSummary from '../../../components/ShoppingPriceSummary/ShoppingPriceSummary';
import CartActionButton from './CartActionButton';

const CartSummary = () => {
  const items = useSelector(state => state.cart.items);
  const totalQuantity = items.reduce((accumulator, item) => {
    if (!item.checked) {
      return accumulator;
    }

    return accumulator + item.quantity;
  }, 0);
  const totalPrice = items.reduce((accumulator, item) => {
    if (!item.checked) {
      return accumulator;
    }

    return accumulator + (item.price * item.quantity);
  }, 0);

  const entries = [
    {
      label: `Total Harga ( ${totalQuantity} barang )`,
      price: totalPrice
    }
  ];

  return (
    <ShoppingPriceSummary entries={entries} button={<CartActionButton />} />
  );
};

export default CartSummary;