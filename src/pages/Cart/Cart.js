import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import CartSelector from '../../components/CartSelector/CartSelector';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ProductCardPlaceholder from '../../components/ProductCard/Placeholder/Placeholder';
import CartShoppingSummary from '../../components/ShoppingPriceSummary/Cart/Cart';

const Cart = () => {
  return (
    <Container className="mt-5">
      <Row className="border-bottom">
        <Col xl={8} lg={8}>
          <p className="h4 mb-4">Keranjang</p>
          <CartSelector />
        </Col>
        <Col xl={4} lg={4}>
          <CartShoppingSummary />
        </Col>
      </Row>
      <ItemContainer title="Mungkin kamu suka">
        <Row md={2} lg={4} xl={4} className="g-4">
          {[1, 2, 3, 4].map(x => (
            <Col key={x}>
              <ProductCardPlaceholder />
            </Col>
          ))}
        </Row>
      </ItemContainer>
    </Container>
  );
};

export default Cart;