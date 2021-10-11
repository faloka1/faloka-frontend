import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import PaymentOptions from '../../../components/PaymentOptions/PaymentOptions';
import { CheckoutContext, PAYMENT_PAGE } from '../../../context/CheckoutContext/CheckoutContext';

const Payment = () => {
  const { currentPage } = useContext(CheckoutContext);

  const history = useHistory();

  useEffect(() => {
    if (currentPage !== PAYMENT_PAGE) {
      history.replace('/checkout/shipment');
    }
  }, [history, currentPage]);

  return (
    <PaymentOptions className="mb-4 mb-lg-0" />
  );
};

export default Payment
