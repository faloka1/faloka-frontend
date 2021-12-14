import { React, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import './TransactionProductCard.scss';

import { BASE_CONTENT_URL } from '../../../../config/api';

const TransactionProductCard = ({ product, isLoading }) => {
    const [pictureLoaded, setPictureLoaded] = useState(false);

    const handleImageLoaded = () => {
        setPictureLoaded(true);
    }

    return (
        <Row as={Link} className="card-product" to={isLoading ? '#' : `/products/${product.products.slug}`}>
            <Col className={`product-image ${!pictureLoaded || isLoading ? 'placeholder-glow' : ''}`}>
                {!pictureLoaded && <span className="image placeholder bg-primary"></span>}
                {!isLoading && <img alt={product.products.name} className={`image ${!pictureLoaded ? 'd-none' : ''}`} onLoad={handleImageLoaded} src={`${BASE_CONTENT_URL}${product.variants.variants_image[0].image_url}`} />}
            </Col>
            <Col className={`product-detail ${isLoading ? 'placeholder-glow' : ''}`}>
                <span className={`product-name ${isLoading ? 'col-2 placeholder bg-secondary mb-1' : ''}`}>{isLoading ? (null) : (product.products.name)}</span>
                <small className={`product-size ${isLoading ? 'col-1 placeholder bg-secondary' : ''}`}>{isLoading ? (null) : (<span>Ukuran : <small className="size-value">{product.variants.variants_sizes[0].name}</small></span>)}</small>
                <span className={`product-quantity ${isLoading ? 'col-3 placeholder bg-secondary' : ''}`}>
                    {isLoading ? (null) : (<span>{product.quantity} x <CurrencyFormat value={product.products.price} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," /></span>)}
                </span>
                <span className="product-price">
                    {isLoading ? (null) : (<CurrencyFormat value={product.products.price * product.quantity} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />)}
                </span>
            </Col>
        </Row>
    );
};

export default TransactionProductCard;