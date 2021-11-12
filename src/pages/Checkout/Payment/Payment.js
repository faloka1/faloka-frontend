import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';

import PaymentOptions from '../../../components/PaymentOptions/PaymentOptions';
import ShoppingSummaryModal from '../../../components/ShoppingSummaryModal/ShoppingSummaryModal';
import { SET_BUTTON } from '../../../context/CheckoutContext/CheckoutActions';
import { CheckoutContext, PAYMENT_PAGE } from '../../../context/CheckoutContext/CheckoutContext';
import useToggle from '../../../hooks/use-toggle';

const Payment = () => {
  const { current_page, is_confirmed, payment_method, dispatch } = useContext(CheckoutContext);
  const { setToggleOn, toggle, setToggleOff } = useToggle();

  const history = useHistory();

  useEffect(() => {
    if (current_page !== PAYMENT_PAGE) {
      history.replace('/checkout/shipment');
    }

    const NextButton = () => {
      return (
        <button
          className={`btn-black w-100 d-inline-block text-center py-2 mt-2 mb-0 ${!!!payment_method ? 'disabled' : ''}`}
          onClick={() => setToggleOn()}
        >
          Konfirmasi Detail Pembayaran
        </button>
      )
    };

    dispatch({ type: SET_BUTTON, payload: { button: <NextButton /> } })
  }, [history, current_page, is_confirmed, setToggleOn, payment_method, dispatch]);

  return (
    <>
      <ShoppingSummaryModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <PaymentOptions className="mb-4 mb-lg-0" />
    </>
  );
};

export default Payment
