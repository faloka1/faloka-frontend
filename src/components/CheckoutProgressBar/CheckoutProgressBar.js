import React from 'react';
import { useLocation } from 'react-router';

import './CheckoutProgressBar.scss';

const CheckoutProgressBar = ({ className }) => {
  let classes = 'position-absolute top-50 start-50 translate-middle';
  const { pathname } = useLocation();
  const isPayment = pathname.includes('payment');

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes}>
      <div className="checkout-progress d-flex align-items-center">
        <p className="mb-0 active">Pengiriman</p>
        <div className={`checkout-progress__path ${isPayment ? 'active' : ''}`}></div>
        <p className={`mb-0 ${isPayment ? 'active' : ''}`}>Pembayaran</p>
      </div>
    </div>
  );
};

export default CheckoutProgressBar;