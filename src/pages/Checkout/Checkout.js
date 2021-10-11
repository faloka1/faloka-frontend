import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CheckoutLayout from '../../components/Layout/CheckoutLayout';
import { CheckoutContextProvider } from '../../context/CheckoutContext/CheckoutContext';
import Shipment from './Shipment/Shipment';
import Payment from './Payment/Payment';

const Checkout = () => {
  return (
    <CheckoutContextProvider>
      <CheckoutLayout>
        <Switch>
          <Route exact path="/checkout/shipment">
            <Shipment />
          </Route>
          <Route exact path="/checkout/payment">
            <Payment />
          </Route>
        </Switch>
      </CheckoutLayout>
    </CheckoutContextProvider>
  );
};

export default Checkout;