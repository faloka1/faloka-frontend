import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const {
    name,
    location,
    brandName,
    price,
    discount,
  } = product;
  const discountPercentage = `${discount * 100}%`;
  const discountedPrice = (1 - discount) * price;

  return (
    <Card className="product-card">
      <Link to="/product/detail">
        <div className="product-image">
          {discount && <div className="discount-tag">{discountPercentage} off</div>}
          <Card.Img variant="top" src="/assets/images/products/product_1.png" />
        </div>
        <Card.Body className="product-detail">
          <div className="product-brand text-truncate">{`${location} - ${brandName}`}</div>
          <div className="product-name text-truncate">{name}</div>
          <div className="product-prize d-inline-flex">
            <CurrencyFormat value={price} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," renderText={value => <span className={` ${discount ? 'price--cut' : ''}`}>{value}</span>} />
            {discount && <CurrencyFormat value={discountedPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," renderText={value => <span className="price--discount mx-3">{value}</span>} />}
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;