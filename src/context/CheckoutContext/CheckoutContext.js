import React, { useReducer } from 'react';
import CheckoutReducer from './CheckoutReducer';

export const SHIPMENT_PAGE = 'shipment';
export const PAYMENT_PAGE = 'payment';

const CheckoutReducerInitial = {
  order_id: null,
  payment_method: null,
  shipment_address: null,
  current_page: SHIPMENT_PAGE,
  items: [],
  is_confirmed: false,
  total_items_price: 0,
  total_expedition_cost: 0,
  total_quantity: 0,
  summary_entries: [],
  button: null,
};

export const CheckoutContext = React.createContext(null);

export const CheckoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CheckoutReducer, CheckoutReducerInitial);

  return (
    <CheckoutContext.Provider value={{
      order_id: state.order_id,
      payment_method: state.payment_method,
      shipment_address: state.shipment_address,
      current_page: state.current_page,
      items: state.items,
      is_confirmed: state.is_confirmed,
      summary_entries: state.summary_entries,
      total_quantity: state.total_quantity,
      total_items_price: state.total_items_price,
      total_expedition_cost: state.total_expedition_cost,
      button: state.button,
      dispatch
    }}>
      {children}
    </CheckoutContext.Provider>
  );
};