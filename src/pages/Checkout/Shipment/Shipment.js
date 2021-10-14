import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-query';
import getProfile from '../../../helpers/api/get-profile';

import ProductsSummary from '../../../components/ProductsSummary/ProductsSummary';
import ShipmentAddress from '../../../components/ShipmentAddress/ShipmentAddress';
import { CheckoutContext, SHIPMENT_PAGE } from '../../../context/CheckoutContext/CheckoutContext';

const Shipment = () => {
  const { setCurrentPage, setShipmentAddress, shipmentAddress, isSuccess } = useContext(CheckoutContext);
  const { isLoading } = useQuery('user-data', async () => {
    const response = await getProfile();

    return response.data;
  },
    {
      onSuccess: (data) => {
        setShipmentAddress({
          name: data.name,
          address: data.addresses.length > 0
            ? data.addresses[0]
            : null,
          phoneNumber: data.phone_number,
        });
      },
      onError: (err) => {
        console.log(err);
      }
    });

  useEffect(() => {
    setCurrentPage(SHIPMENT_PAGE);
  }, [setCurrentPage]);

  return (
    <>
      {!isSuccess && <ShipmentAddress shipmentAddress={shipmentAddress} loading={isLoading} className="mb-4" />}
      <ProductsSummary className="mb-4 mb-lg-0" />
    </>
  );
};

export default Shipment;