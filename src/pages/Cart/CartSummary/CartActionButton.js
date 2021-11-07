import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartActionButton = () => {
  const items = useSelector(state => state.cart.items);
  let classes = 'btn-black w-100 d-inline-block text-center py-2 mt-2 mb-0';
  const anyChecked = items.some(item => item.checked);
  const checkedItemsJson = JSON.stringify(items.filter(item => item.checked));

  if (!anyChecked) {
    classes += ' disabled';
  }

  return (
    <Link
      className={classes}
      disabled={!anyChecked}
      to={{
        pathname: "/checkout",
        search: `items=${encodeURIComponent(checkedItemsJson)}`
      }}
    >
      Lanjut Bayar
    </Link>
  );
};

export default CartActionButton;