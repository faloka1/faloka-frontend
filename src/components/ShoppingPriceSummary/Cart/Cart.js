import React from 'react';

import ShoppingPriceSummary from '../ShoppingPriceSummaryV2'
import CartActionButton from './CartActionButton';

const Cart = () => {
  const entries = [
    {
      label: 'Total Harga ( 6 barang )',
      price: 80000
    }
  ];

  return (
    <ShoppingPriceSummary entries={entries} button={<CartActionButton />} />
  );
};

export default Cart;