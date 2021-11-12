import React from 'react';
import { Card } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import './ShoppingPriceSummary.scss';

const ShoppingPriceSummary = ({ entries, button = <button>Placeholder</button> }) => {
  const totalPrice = entries.reduce((accumulator, entry) => (accumulator + entry.price), 0);

  return (
    <Card className="shopping-price-summary">
      <Card.Body>
        <Card.Title className="mb-4"><strong>Ringkasan Jumlah</strong></Card.Title>
        {entries.map(entry => (
          <div key={entry.label} className="d-flex justify-content-between">
            <p className="text-gray">{entry.label}</p>
            {entry.price
              ? <CurrencyFormat
                value={entry.price}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p>{value}</p>}
              />
              : <p>-</p>
            }
          </div>
        ))}
        <div className="d-flex justify-content-between mt-3">
          <p>Total Belanja</p>
          <CurrencyFormat
            value={totalPrice}
            displayType={'text'}
            prefix={'Rp'}
            thousandSeparator="."
            decimalSeparator=","
            renderText={value => <p className="total-price"><strong>{value}</strong></p>}
          />
        </div>
        {button}
      </Card.Body>
    </Card>
  );
};

export default ShoppingPriceSummary;