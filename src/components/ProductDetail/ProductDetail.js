import React, { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner'
import { Link } from 'react-router-dom';
import { Col, Row, Button, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../stores/cart/cart-slice';
import { addItem } from '../../stores/cart/cart-actions';


import './ProductDetail.scss';

import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import { BASE_CONTENT_URL } from '../../config/api';

const ProductDetail = ({ className, product }) => {
  const isAddingToCart = useSelector(state => state.cart.isLoading);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
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

  const addToCartHandler = () => {
    dispatch(addItem(
      {
        brand: {
          id: brands.id,
          slug: brands.slug,
          name: brands.name,
        },
        price: price,
        name: name,
        variant_id: variants[0].id,
        product_id: variants[0].product_id,
        image: `${BASE_CONTENT_URL}${variants_image[0].image_url}`,
        size: variantName
      },
      quantity
    ));
    setShowToast(true);
  };

  const itemJson = {
    id: null,
    brand: {
      id: brands.id,
      slug: brands.slug,
      name: brands.name,
    },
    product_id: variants[0].product_id,
    variant_id: variants[0].id,
    name: name,
    image: `${BASE_CONTENT_URL}${variants_image[0].image_url}`,
    size: variantName,
    price,
    quantity: +quantity,
  };

  // state.items.push({
  //   id: item.id,
  //   brand: {
  //     id: item.brand.id,
  //     slug: item.brand.slug,
  //     name: item.brand.name,
  //   },
  //   product_id: item.product_id,
  //   variant_id: item.variant_id,
  //   name: item.name,
  //   image: item.image,
  //   size: item.size,
  //   price: item.price,
  //   quantity: +quantity,
  //   checked: true
  // });

  return (
    <>
      <Toast xs={8} show={showToast} autohide onClose={() => setShowToast(false)} delay={2000} className="d-inline-block m-1 position-fixed top-25 start-50 translate-middle" bg={'dark'} style={{ zIndex: '1000' }}>
        <Toast.Body className='text-white text-center'>
          Berhasil memasukkan ke tas.
        </Toast.Body>
      </Toast>
      <Row className={`product-item`}>
        <Col md={6} lg={4} xl={3}>
          <Link to="#">
            <div className="product-image">
              <img src={`${BASE_CONTENT_URL}${variants_image[0].image_url}`} alt={name} />
            </div>
          </Link>
        </Col>
        <Col md={6} lg={8} xl={9} className="product-info">
          <Link to="#" className="product-brand">{brands.name}</Link>
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
              <InputSpinner type="int" min={1} variant={'primary'} value={quantity} onChange={num => setQuantity(num)} size="sm" />
            </div>
          </div>
          <Row>
            <Col xs={12} lg={6} xl={4} className="product-buy">
              <Button className={`mt-3 btn-black btn-black--invert rounded-0 w-100 ${isAddingToCart ? 'disabled' : ''}`} onClick={addToCartHandler}>Masukkan Keranjang</Button>
            </Col>
            <Col xs={12} lg={6} xl={4} className="product-buy">

              <Link
                to={{
                  pathname: "/checkout",
                  search: `items=${encodeURIComponent(JSON.stringify([itemJson]))}`
                }}
              >
                <Button className={`mt-3 btn-black rounded-0 w-100 ${isAddingToCart ? 'disabled' : ''}`}>Beli Sekarang</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;