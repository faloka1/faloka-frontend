import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_CONTENT_URL } from '../../../../config/api';

import './TransactionProductCard.scss';

const TransactionProductCard = ({ product }) => {
    return (
        <Row className="card-product">
            <Col className="product-image">
                <img src="/assets/images/products/product_1.png"/>
            </Col>
            <Col className="product-detail">
                <span className="product-name">Blouse Bagus</span>
                <small className="product-size">Ukuran : <small className="size-value">All Size</small></small>
                <span className="product-price">Rp 52.000</span>
                <span className="product-quantity">1x</span>
            </Col>
        </Row>
    );
};

export default TransactionProductCard;