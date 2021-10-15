import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import './ProductsSummary.scss';

import ExpeditionSelector from '../ExpeditionSelector/ExpeditionSelector';
import ProductCardCart from '../ProductCardCart/ProductCardCart';

const ProductsSummary = ({ productCart, productsOnly, ...props }) => {
  const { product, quantity } = productCart;

  if (!!!productCart?.product) {
    return null;
  }

  return (
    <Card {...props}>
      <Card.Body>
        <Card.Title className="mb-3"><strong>{product?.brands.name}</strong></Card.Title>
        <Row>
          {productsOnly &&
            <Col sm={12}>
              <ProductCardCart className="mb-2" productCart={productCart} />
            </Col>
          }
          {!productsOnly &&
            <>
              <Col xl={8} lg={8} md={8}>
                <ProductCardCart className="mb-2" productCart={productCart} />
              </Col>
              <Col xl={4} lg={4} md={4}>
                <ExpeditionSelector />
              </Col>
            </>
          }
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between p-3">
        <p className="mb-0">Sub total</p>
        <CurrencyFormat
          value={product?.price * quantity}
          displayType={'text'}
          prefix={'Rp'}
          thousandSeparator="."
          decimalSeparator=","
          renderText={value => <p className="sub-total-price mb-0"><strong>{value}</strong></p>}
        />
      </Card.Footer>
    </Card>
  );
};

export default ProductsSummary;