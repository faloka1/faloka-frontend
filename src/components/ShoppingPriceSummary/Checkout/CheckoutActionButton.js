import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import useToggle from '../../../hooks/use-toggle';
import { CheckoutContext, PAYMENT_PAGE, SHIPMENT_PAGE } from "../../../context/CheckoutContext/CheckoutContext";

const CheckoutActionButton = ({ onToggleModal }) => {
  const {
    currentPage,
    isConfirmed,
    paymentMethod,
    setCurrentPage,
    shipmentAddress,
    expedition
  } = useContext(CheckoutContext);
  const shipmentNextDisabled = !!!expedition.cost || !!!shipmentAddress.address;

  const actionButton = currentPage === SHIPMENT_PAGE
    ? <Link
      to="/checkout/payment"
      className={`btn-black pay-btn w-100 d-inline-block w-100 text-center py-2 mt-2 ${shipmentNextDisabled ? 'disabled' : ''}`}
      disabled={shipmentNextDisabled}
      onClick={() => { setCurrentPage(PAYMENT_PAGE); console.log('test') }}
    >Lanjut Bayar</Link>
    : currentPage === PAYMENT_PAGE && !isConfirmed
      ? <p
        className={`btn-black w-100 d-inline-block text-center py-2 mt-2 mb-0 ${!!!paymentMethod ? 'disabled' : ''}`}
        onClick={onToggleModal}
      >Konfirmasi Detail Pembayaran</p>
      : currentPage === PAYMENT_PAGE && isConfirmed
        ? <div className="d-flex flex-column">
          <p className="btn-black text-center py-2">Upload bukti pembayaran</p>
          <p className="btn-black btn-black--invert text-center py-2 mb-0">Bayar nanti</p>
        </div> : '';

  return (
    { actionButton }
  );
}

export default CheckoutActionButton
