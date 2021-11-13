import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { CheckoutContext } from '../../../context/CheckoutContext/CheckoutContext';
import { INIT_CHECKOUT } from '../../../context/CheckoutContext/CheckoutActions';

import getUserProfile from '../../../helpers/api/get-user-profile';

const CheckoutGateway = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { dispatch } = useContext(CheckoutContext);
  const urlSearch = new URLSearchParams(search);
  const items = JSON.parse(urlSearch.get('items'));
  useQuery('user-data', async () => {
    const response = await getUserProfile();

    return response.data;
  }, {
    onSuccess: (data) => {
      const address = data.addresses.length > 0
        ? data.addresses[0]
        : null;
      dispatch({
        type: INIT_CHECKOUT,
        payload: {
          name: data.name,
          phone_number: data.phone_number,
          address,
          items,
        }
      });

      history.replace('/checkout/shipment');
    },
    onError: (error) => {
      console.log(error);
    }
  });

  useEffect(() => {
    if (!!!items) {
      history.replace('/');
    }
  });

  return (
    <div className="mx-auto d-block">
      <Spinner />
    </div>
  );
};

export default CheckoutGateway;