import React, { useState } from 'react';

export const SHIPMENT_PAGE = 'shipment';
export const PAYMENT_PAGE = 'payment';

const CheckoutContextInitialValue = {
  paymentMethod: null,
  currentPage: SHIPMENT_PAGE,
  isConfirmed: false,
};

export const CheckoutContext = React.createContext(CheckoutContextInitialValue);

export const CheckoutContextProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(CheckoutContextInitialValue.paymentMethod);
  const [currentPage, setCurrentPage] = useState(CheckoutContextInitialValue.currentPage);
  const [isConfirmed, setIsConfirmed] = useState(CheckoutContextInitialValue.isConfirmed)

  return (
    <CheckoutContext.Provider value={{
      paymentMethod,
      setPaymentMethod,
      currentPage,
      setCurrentPage,
      isConfirmed,
      setIsConfirmed
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};