import React, { useContext, useEffect } from 'react';

import ProductsSummary from '../../../components/ProductsSummary/ProductsSummary';
import ShipmentAddress from '../../../components/ShipmentAddress/ShipmentAddress';
import { CheckoutContext, SHIPMENT_PAGE } from '../../../context/CheckoutContext/CheckoutContext';

const Shipment = () => {
  const { setCurrentPage } = useContext(CheckoutContext);

  useEffect(() => {
    setCurrentPage(SHIPMENT_PAGE);
  }, [setCurrentPage]);

  return (
    <>
      <ShipmentAddress className="mb-4" />
      <ProductsSummary className="mb-4 mb-lg-0" />
    </>
  );
};

export default Shipment;