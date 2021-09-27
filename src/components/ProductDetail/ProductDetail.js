import React from 'react';
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
    <Row className={`product-item`}>
      <Col md={6} lg={4} xl={3}>
        <Link to="#">
          <div className="product-image">
            <img src="/assets/images/products/product_1.png" alt={name} />
          </div>
        </Link>
      </Col>
      <Col md={6} lg={8} xl={9} className="product-info">
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
        <Col xl={6} className="product-buy">
          <Button variant={'primary'} type={'button'} className={'mt-3 btn-flat w-100'}>Beli Sekarang</Button>
        </Col>
      </Col>
    </Row>
  );
};

export default ProductDetail;