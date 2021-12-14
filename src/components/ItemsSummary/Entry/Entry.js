import React from 'react';

import './Entry.scss';

import CurrencyFormatter from '../../CurrencyFormatter/CurrencyFormatter';

const Entry = ({ className, item }) => {
  const {
    name,
    price,
    variant_size,
    image
  } = item;

  return (
    <div className={`items-summary__entry border${className ? ' ' + className : ''} d-flex align-items-center`}>
      <img src={image} alt="product_image" />
      <div className="flex-grow-1">
        <p className="mb-0">{name}</p>
        <p className="mb-3"><span className="text-gray">Ukuran : </span> {variant_size.name}</p>
        <CurrencyFormatter value={price} renderText={value => <p className="mb-0"><strong>{value}</strong></p>} />
      </div>
      <p className="price mb-0"><strong>{item.quantity}x</strong></p>
    </div >
  );
};

export default Entry;