import React, { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';

import CheckoutProgressBar from '../CheckoutProgressBar/CheckoutProgressBar';
import ShoppingPriceSummary from '../ShoppingPriceSummary/ShoppingPriceSummary';

const CheckoutLayout = ({ children }) => {
  const history = useHistory();
  const { product } = useContext(CheckoutContext);

  if (!!!product?.product) {
    history.replace('/');
  }

  return (
    <div div className="d-lg-block d-flex flex-column pt-0 pt-lg-5" >
      <Container className="my-5 h-25  d-block d-lg-none">
        <div className="position-relative w-100">
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
    </div >
  );
};

export default CheckoutLayout
