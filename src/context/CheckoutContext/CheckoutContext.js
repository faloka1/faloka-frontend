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
  },
  product: {
    product: null,
    quantity: 0,
  },
  orderId: null,
  totalPrice: 0,
};

export const CheckoutContext = React.createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  const [paymentMethod, setPaymentMethod] = useState(CheckoutContextInitialValue.paymentMethod);
  const [currentPage, setCurrentPage] = useState(CheckoutContextInitialValue.currentPage);
  const [isConfirmed, setIsConfirmed] = useState(CheckoutContextInitialValue.isConfirmed);
  const [shipmentAddress, setShipmentAddress] = useState(CheckoutContextInitialValue.shipmentAddress);
  const [expedition, setExpedition] = useState(CheckoutContextInitialValue.expedition);
  const [product, setProduct] = useState(CheckoutContextInitialValue.product);
  const [orderId, setOrderId] = useState(CheckoutContextInitialValue.orderId);
  const [totalPrice, setTotalPrice] = useState(CheckoutContextInitialValue.totalPrice);

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
      setExpedition,
      product,
      setProduct,
      orderId,
      setOrderId,
      totalPrice,
      setTotalPrice
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};