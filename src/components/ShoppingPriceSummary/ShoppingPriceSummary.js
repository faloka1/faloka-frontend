import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './ShoppingPriceSummary.scss';

const ShoppingPriceSummary = () => {
  return (
    <Card className="shopping-price-summary">
      <Card.Body>
        <Card.Title className="mb-4"><strong>Ringkasan Jumlah</strong></Card.Title>
        <div className="d-flex justify-content-between">
          <p>Total Harga ( 1 barang )</p>
          <p>Rp80.000</p>
        </div>
        <div className="d-flex justify-content-between">
          <p>Biaya Ongkir</p>
          <p>-</p>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <p>Total Belanja</p>
          <p className="total-price"><strong>Rp80.000</strong></p>
        </div>
        <Link to="#" className="btn-black pay-btn w-100 d-inline-block w-100 text-center py-2 mt-2">Lanjut Bayar</Link>
      </Card.Body>
    </Card>
  );
};

export default ShoppingPriceSummary;