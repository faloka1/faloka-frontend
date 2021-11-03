import React from 'react';
import { useSelector } from 'react-redux';

const CartActionButton = () => {
  const items = useSelector(state => state.cart.items);
  let classes = 'btn-black w-100 d-inline-block text-center py-2 mt-2 mb-0';
  const anyChecked = items.some(item => item.checked);

  if (!anyChecked) {
    classes += ' disabled';
  }

  return (
    <button
      className={classes}
      disabled={!anyChecked}
    >
      Lanjut Bayar
    </button>
  );
};

export default CartActionButton;