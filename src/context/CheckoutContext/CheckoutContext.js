import React, { useState } from 'react';

export const SHIPMENT_PAGE = 'shipment';
export const PAYMENT_PAGE = 'payment';

const CheckoutContextInitialValue = {
  paymentMethod: null,
  currentPage: SHIPMENT_PAGE,
  isConfirmed: false,
  shipmentAddress: {
    name: '',
    address: null,
    phoneNumber: '',
  },
  expedition: {
    name: '',
    code: '',
    cost: null,
  }
};

export const CheckoutContext = React.createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(CheckoutContextInitialValue.paymentMethod);
  const [currentPage, setCurrentPage] = useState(CheckoutContextInitialValue.currentPage);
  const [isConfirmed, setIsConfirmed] = useState(CheckoutContextInitialValue.isConfirmed);
  const [shipmentAddress, setShipmentAddress] = useState(CheckoutContextInitialValue.shipmentAddress);
  const [expedition, setExpedition] = useState(CheckoutContextInitialValue.expedition);

  return (
    <CheckoutContext.Provider value={{
      paymentMethod,
      setPaymentMethod,
      currentPage,
      setCurrentPage,
      isConfirmed,
      setIsConfirmed,
      shipmentAddress,
      setShipmentAddress,
      expedition,
      setExpedition
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};