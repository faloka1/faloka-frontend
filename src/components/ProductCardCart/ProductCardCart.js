import React from 'react';

import './ProductCardCart.scss';

import { BASE_CONTENT_URL } from '../../config/api';
import CurrencyFormat from 'react-currency-format';

const ProductCardCart = ({ className, productCart }) => {
  if (!!!productCart?.product) {
    return null;
  }
  const { product, quantity } = productCart;
  const {
    name,
    price,
    variants,
  } = product;
  const variant = variants[0];
  const { variants_image } = variant;

  return (
    <div className={`product-card-cart border${className ? ' ' + className : ''} d-flex align-items-center`}>
      <img src={`${BASE_CONTENT_URL}/${variants_image[0].image_url}`} alt="product_image" />
      <div className="flex-grow-1">
        <p className="mb-0">{name}</p>
        <p className="mb-3"><span className="text-gray">Ukuran : </span> {variant.name}</p>
        <CurrencyFormat
          value={price}
          displayType={'text'}
          prefix={'Rp'}
          thousandSeparator="."
          decimalSeparator=","
          renderText={value => <p className="mb-0"><strong>{value}</strong></p>}
        />
      </div>
      <p className="price mb-0"><strong>{quantity}x</strong></p>
    </div >
  );
};

export default ProductCardCart;