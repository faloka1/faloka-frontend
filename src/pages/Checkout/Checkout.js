import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CheckoutLayout from '../../components/Layout/CheckoutLayout';
import { CheckoutContextProvider } from '../../context/CheckoutContext/CheckoutContext';
import Shipment from './Shipment/Shipment';
import Payment from './Payment/Payment';
import CheckoutGateway from './CheckoutGateway/CheckoutGateway';
import Finish from './Finish/Finish';

const Checkout = () => {
  return (
    <CheckoutContextProvider>
      <Switch>
        <Route exact path="/checkout">
          <CheckoutGateway />
        </Route>
        <Route exact path="/checkout/finish">
          <Finish />
        </Route>
        <Route>
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
        </Route>
      </Switch>
    </CheckoutContextProvider>
  );
};

export default Checkout;