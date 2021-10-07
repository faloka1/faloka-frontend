import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import CheckoutProgressBar from '../../../components/CheckoutProgressBar/CheckoutProgressBar';
import ProductsSummary from '../../../components/ProductsSummary/ProductsSummary';
import ShipmentAddress from '../../../components/ShipmentAddress/ShipmentAddress';
import ShoppingPriceSummary from '../../../components/ShoppingPriceSummary/ShoppingPriceSummary';

const Shipment = () => {
  return (
    <div className="d-md-block d-flex flex-column">
      <Container className="my-5 h-25">
        <div className="position-relative w-100 d-block d-md-none">
          <CheckoutProgressBar />
        </div>
      </Container>
      <Container>
        <Row>
          <Col xl={8} lg={8}>
            <ShipmentAddress className="mb-4" />
            <ProductsSummary className="mb-4 mb-lg-0" />
          </Col>
          <Col xl={4} lg={4}>
            <ShoppingPriceSummary />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shipment;