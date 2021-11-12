import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

import './ProductCard.scss';

import { BASE_CONTENT_URL } from '../../config/api';

const ProductCard = ({ product }) => {
  let {
    name,
    // location,
    brands,
    price,
    discount,
    slug,
    variants
  } = product;
  const discountPercentage = `${discount * 100}%`;
  const discountedPrice = (1 - discount) * price;
  const brandName = brands.name;
  const { variants_image } = variants[0];
  console.log(product);

  return (
    <Card className="product-card">
      <Link to={`/products/${slug}`}>
        <div className="product-image">
          {discount > 0 && <div className="discount-tag">{discountPercentage} off</div>}
          <Card.Img variant="top" src={`${BASE_CONTENT_URL}/${variants_image[0].image_url}`} />
        </div>
        <Card.Body className="product-detail">
          <div className="product-brand text-truncate">{brandName}</div>
          <div className="product-name text-truncate">{name}</div>
          <div className="product-prize d-inline-flex">
            <CurrencyFormatter value={price} renderText={value => <span className={` ${discount ? 'price--cut' : ''}`}>{value}</span>} />
            {discount > 0 &&
              <CurrencyFormatter value={discountedPrice} renderText={value => <span className="price--discount mx-3">{value}</span>} />
            }
          </div>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProductCard;