import React from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Sidebar from '../../../components/User/Sidebar/Sidebar';
import TransactionCard from '../../../components/User/TransactionCard/TransactionCard';
import './Transaction.scss';

const Transaction = () => {
    return (
        <Container>
            <Row className="profile g-4">
                <Col xs={12} xxl={2}>
                    <Sidebar account="cok" />
                </Col>
                <Col xs={12} xxl={10}>
                    <div className="custom-tab">
                        <Tabs defaultActiveKey="awaiting-payment" id="transaction-tab">
                            <Tab eventKey="awaiting-payment" title="Menunggu pembayaran">
                                <span className="info-payment">Pesanan akan hangus jika tidak dibayar selama 24 jam</span>
                                <TransactionCard transaction="asu" />
                            </Tab>
                            <Tab eventKey="awaiting-confirmation" title="Sedang konfirmasi">
                                <span className="info-confirmation">Pesananmu akan dikemas setelah pembayaran terkonfirmasi</span>
                            </Tab>
                            <Tab eventKey="shipping" title="Sedang dikirim">
                            </Tab>
                            <Tab eventKey="delivered" title="Sudah sampai">
                            </Tab>
                            <Tab eventKey="done" title="Selesai">
                            </Tab>
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Transaction;