import React, { useContext, useEffect } from 'react'
import { Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { CheckoutContext } from '../../../context/CheckoutContext/CheckoutContext';

import getProductDetail from '../../../helpers/api/get-product-detail';

const CheckoutGateway = () => {
  const { search } = useLocation();
  const history = useHistory();
  const { setProduct } = useContext(CheckoutContext);
  const urlSearch = new URLSearchParams(search);
  const productSlug = urlSearch.get('product');
  const quantity = +urlSearch.get('quantity');
  useQuery(
    ['product-detail', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;
      const response = await getProductDetail(productSlug);

      return response.data;
    },
    {
      onSuccess: (data) => {
        setProduct({
          product: data,
          quantity,
        });
        history.replace('/checkout/shipment');
      },
      onError: () => {
        history.replace('/');
      }
    }
  );


  useEffect(() => {
    if (!!!productSlug || !!!quantity) {
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