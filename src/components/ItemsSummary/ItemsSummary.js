import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import './ItemsSummary.scss';

import ExpeditionSelector from './ExpeditionSelector/ExpeditionSelector';
import Entry from './Entry/Entry';

const ItemsSummary = ({ items, brand, itemsOnly, ...props }) => {
  if (items.length === 0) {
    return null;
  }
  const totalPrice = items.reduce((accumulator, item) => (accumulator + (item.price * item.quantity)), 0);

  return (
    <Card {...props}>
      <Card.Body>
        <Card.Title className="mb-3"><strong>{brand.name}</strong></Card.Title>
        <Row>
          {itemsOnly &&
            items.map(item => (
              <Col key={item.id} sm={12}>
                <Entry className="mb-2" item={item} />
              </Col>
            ))
          }
          {!itemsOnly &&
            <>
              <Col xl={8} lg={8} md={8}>
                <div className="d-flex flex-column">
                  {items.map(item => (
                    <Entry key={item.id} className="mb-2 w-100" item={item} />
                  ))}
                </div>
              </Col>
              <Col xl={4} lg={4} md={4}>
                <ExpeditionSelector assignedBrand={brand.slug} />
              </Col>
            </>
          }
        </Row>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between p-3">
        <p className="mb-0">Sub total</p>
        <CurrencyFormat
          value={totalPrice}
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

ItemsSummary.Entry = Entry;
ItemsSummary.ExpeditionSelector = ExpeditionSelector;

export default ItemsSummary;