import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_CONTENT_URL } from '../../../config/api';

import TransactionProductCard from '../../../components/User/TransactionCard/TransactionProductCard/TransactionProductCard';

import './TransactionCard.scss';

const TransactionCard = ({ transaction }) => {
    return (
        <div className="card-transaction">
            <div className="transaction-brand">
                Brand Indo
            </div>
            <div className="transaction-product">
                <TransactionProductCard/>
            </div>
            <Row xs={2} lg={6} className="transaction-footer g-2">
                <Col>
                    <span className="total-label">Total Pembayaran</span>
                </Col>
                <Col className="d-flex justify-content-end justify-content-lg-start">
                    <small className="detail-label ml-lg-0">Lihat rincian</small>
                </Col>
                <Col lg={5} className="d-flex justify-content-lg-end">
                    <span className="transaction-price">Rp 52.000</span>
                </Col>
                <Col xs={12} lg={3} className="mt-3 mt-lg-2">
                    <Button variant={'primary'} type={'button'} className={'btn-flat'}>Lihat Bukti Pembayaran</Button>
                </Col>
            </Row>
        </div>
    );
};

export default TransactionCard;