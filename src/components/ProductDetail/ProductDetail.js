import React, { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner'
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';

import './ProductDetail.scss';

import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import { BASE_CONTENT_URL } from '../../config/api';

const ProductDetail = ({ className, product }) => {
  const [quantity, setQuantity] = useState(1);
  const {
    name,
    brands,
    price,
    discount,
    variants,
    slug,
  } = product;
  const discountPercentage = `${discount * 100}%`;
  const discountedPrice = (1 - discount) * price;
  const { name: variantName, variants_image } = variants[0];

  return (
    <Row className={`product-item`}>
      <Col md={6} lg={4} xl={3}>
        <Link to="#">
          <div className="product-image">
            <img src={`${BASE_CONTENT_URL}${variants_image[0].image_url}`} alt={name} />
          </div>
        </Link>
      </Col>
      <Col md={6} lg={8} xl={9} className="product-info">
        <Link className="product-brand">{brands.name}</Link>
        <h4 className="product-name text-uppercase">{name}</h4>
        <div className="product-price">
          <CurrencyFormatter value={price} renderText={value => <span className={` ${discount ? 'product-price--cut' : ''}`}>{value}</span>} />
          {discount &&
            <CurrencyFormatter value={discountedPrice} renderText={value => <span className="product-price--discount mx-3">{value}</span>} />
          }
        </div>
        <div className="product-size">
          <small>Ukuran</small>
          <span>{variantName}</span>
        </div>
        <div className="product-quantity">
          <small>Kuantitas</small>
          <div className="quantity-spinner mt-1">
            <InputSpinner type="int" min={1} max={5} variant={'primary'} value={quantity} onChange={num => setQuantity(num)} size="sm" />
          </div>
        </div>
        <Row>
          <Col xs={12} lg={6} xl={4} className="product-buy">
            <Button className="mt-3 btn-black btn-black--invert rounded-0 w-100">Masukkan Keranjang</Button>
          </Col>
          <Col xs={12} lg={6} xl={4} className="product-buy">
            <Link to={`/checkout?product=${slug}&quantity=${quantity}`}>
              <Button className="mt-3 btn-black rounded-0 w-100">Beli Sekarang</Button>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProductDetail;