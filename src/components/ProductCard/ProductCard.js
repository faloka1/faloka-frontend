import React from 'react';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

import { ReactComponent as HeartIcon } from '../SVG/heart.svg';

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
    <div className="product-card border">
      <Link to="#">
        <div className="thumbnail">
          {discount && <div className="discount-tag">{discountPercentage} off</div>}
          <img className="w-100" src="/assets/images/products/product_1.png" alt="product_thumbnail" />
        </div>
      </Link>
      <div className="d-flex flex-column justify-content-between p-2">
        <div className="d-inline-flex w-100 justify-content-between align-items-center">
          <div className="info d-flex flex-column mb-2">
            <Link to="#" className="text-gray mb-0">
              {`${location} - ${brandName}`}
            </Link>
            <Link to="#" className="name">
              {name}
            </Link>
          </div>
          <HeartIcon className="icon" />
        </div>
        <div className="price-section d-inline-flex">
          <p className={`price ${discount ? 'price--cut' : ''}`}>Rp{price}</p>
          {discount && <p className="price price--discount mx-3">Rp{discountedPrice}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;