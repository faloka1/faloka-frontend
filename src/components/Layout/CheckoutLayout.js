import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';
import ShoppingPriceSummary from '../ShoppingPriceSummary/ShoppingPriceSummary';

const CheckoutLayout = ({ children }) => {
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
            {children}
          </Col>
          <Col xl={4} lg={4}>
            <ShoppingPriceSummary />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutLayout
