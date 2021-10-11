import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import ProductCardCart from '../ProductCardCart/ProductCardCart';

import './ProductsSummary.scss';

const ProductsSummary = ({ productsOnly, ...props }) => {
  const [validShipmentSelect, setValidShipmentSelect] = useState(false);

  const shipmentSelectHandler = (event) => {
    if (event.target.value !== "0") {
      setValidShipmentSelect(true);
    } else {
      setValidShipmentSelect(false);
    }
  };

  return (
    <Card {...props}>
      <Card.Body>
        <Card.Title className="mb-3"><strong>Brand Indo</strong></Card.Title>
        <Row>
          {productsOnly &&
            <Col sm={12}>
              <ProductCardCart className="mb-2" productCart={{}} />
              <ProductCardCart className="mb-2" productCart={{}} />
              <ProductCardCart className="mb-2" productCart={{}} />
            </Col>
          }
          {!productsOnly &&
            <>
              <Col xl={8} lg={8} md={8}>
                <ProductCardCart className="mb-2" productCart={{}} />
                <ProductCardCart className="mb-2" productCart={{}} />
                <ProductCardCart className="mb-2" productCart={{}} />
              </Col>
              <Col xl={4} lg={4} md={4}>
                <Form.Select aria-label="Shipment service" onChange={shipmentSelectHandler}>
                  <option value="0">Pilihan pengiriman</option>
                  <option value="1">JNE Regular (Rp10.000,-)</option>
                  <option value="2">JNE Regular (Rp10.000,-)</option>
                  <option value="3">JNE Regular (Rp10.000,-)</option>
                </Form.Select>
                {validShipmentSelect && <div className="shipment-detail border p-2">
                  <p className="text-gray">Reguler</p>
                  <p className="mb-0 text-gray">Estimasi sampai 2 - 3 hari</p>
                </div>}
              </Col>
            </>
          }
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between p-3">
        <p className="mb-0">Sub total</p>
        <p className="sub-total-price mb-0"><strong>Rp80.000</strong></p>
      </Card.Footer>
    </Card>
  );
};

export default ProductsSummary;