import React, { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner'
import { Link, useHistory } from 'react-router-dom';
import { Col, Row, Button, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../stores/cart/cart-actions';

import './ProductDetail.scss';

import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import { BASE_CONTENT_URL } from '../../config/api';

const ProductDetail = ({ className, product }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAddingToCart = useSelector(state => state.cart.isLoading);
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);
  const history = useHistory();
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

  const loadedImageHandler = () => {
    setImageLoaded(true);
  }

  const addToCartHandler = () => {
    if (isLoggedIn) {
      dispatch(addItem(
        {
          brand: {
            id: brands.id,
            slug: brands.slug,
            name: brands.name,
          },
          price: price,
          slug: slug,
          name: name,
          variant_id: variants[0].id,
          product_id: variants[0].product_id,
          image: `${BASE_CONTENT_URL}${variants_image[0].image_url}`,
          size: variantName
        },
        +quantity
      ));
      setShowToast(true);
    } else {
      history.push('/login');
    }
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
    slug: slug,
    name: name,
    image: `${BASE_CONTENT_URL}${variants_image[0].image_url}`,
    size: variantName,
    price,
    quantity: +quantity,
  };

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
            <div className="product-image placeholder-glow">
              {!imageLoaded && <span className="placeholder w-100 image"></span>}
              <img className={`image ${!imageLoaded ? 'd-none' : ''}`} src={`${BASE_CONTENT_URL}${variants_image[0].image_url}`} alt={name} onLoad={loadedImageHandler} />
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