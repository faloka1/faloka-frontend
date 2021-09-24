import React, { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner'  
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';

import './ProductDetail.scss';

const ProductDetail = ({ className, product }) => {
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
    <Row className={`product-item ${className}`}>
      <Col lg={3}>
        <Link to="#">
          <div className="product-image">
            <img src="/assets/images/products/product_1.png" alt={name} />
          </div>
        </Link>
      </Col>
      <Col lg={9} className="product-info">
        <a className="product-brand">{brandName}</a>
        <h4 className="product-name text-uppercase">{name}</h4>
        <div className="product-price">
          <CurrencyFormat value={price} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," renderText={value => <span className={` ${discount ? 'product-price--cut' : ''}`}>{value}</span>} />
          {discount && <CurrencyFormat value={discountedPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," renderText={value => <span className="product-price--discount mx-3">{value}</span>} />}
        </div>
        <div className="product-size">
          <small>Ukuran</small>
          <span>All Size</span>
        </div>
        <div className="product-quantity">
          <small>Kuantitas</small>
          <div className="quantity-spinner mt-1">
            < InputSpinner type="int" min={0} max={5} variant={'primary'} value={0} size="sm" />
          </div>
        </div>
        <Button variant={'primary'} type={'button'} className={'mt-3 w-50 btn-flat'}>Beli Sekarang</Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;