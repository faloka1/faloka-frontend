import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

import './ItemsSummary.scss';

import Entry from './Entry/Entry';

const ItemsExpeditionSummary = ({ items, brandName, expedition, ...props }) => {
  if (items.length === 0) {
    return null;
  }
  const totalItemsPrice = items.reduce((accumulator, item) => (accumulator + (item.price * item.quantity)), 0);
  const totalPrice = totalItemsPrice + expedition.cost;

  return (
    <Card {...props}>
      <Card.Body className="p-0">
        <div className="p-3">
          <Card.Title className="mb-3"><strong>{brandName}</strong></Card.Title>
          <Row className="mb-3">
            {items.map(item => (
              <Col key={item.id} sm={12}>
                <Entry className="mb-2" item={item} />
              </Col>
            ))}
          </Row>
          <div className="d-flex justify-content-between">
            <p className="mb-0">Total Produk</p>
            <CurrencyFormatter value={totalItemsPrice} renderText={value => <p className="text-accent mb-0">{value}</p>} />
          </div>
        </div>
        <div className="border-top p-3">
          <p className="text-uppercase mb-2">Pengiriman</p>
          <div className="d-flex justify-content-between">
            <p className="text-gray mb-1">Metode</p>
            <p className="mb-1">{expedition.name}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-gray">Tipe</p>
            <p>{`${expedition.service} (${expedition.description})`}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="mb-1">Total Pengiriman</p>
            <CurrencyFormatter value={expedition.cost} renderText={value => <p className="text-accent mb-0"><strong>{value}</strong></p>} />
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between p-3">
        <p className="mb-0">Sub total</p>
        <CurrencyFormatter value={totalPrice} renderText={value => <p className="sub-total-price mb-0"><strong>{value}</strong></p>} />
      </Card.Footer>
    </Card>
  );
};

ItemsExpeditionSummary.Entry = Entry;

export default ItemsExpeditionSummary;