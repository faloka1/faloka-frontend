import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { useQuery } from 'react-query';
import getUserTransaction from '../../../helpers/api/get-user-transaction';
import Sidebar from '../../../components/User/Sidebar/Sidebar';
import TransactionCard from '../../../components/User/TransactionCard/TransactionCard';
import './Transaction.scss';

const Transaction = () => {
    const [unpaidTransaction, setUnpaidTransaction] = useState([]);
    const [pendingTransaction, setPendingTransaction] = useState([]);
    const { isLoading } = useQuery('user-transaction', async () => {
        const response = await getUserTransaction();
        return response.data;
    }, {
        onSuccess: (data) => {
            const unpaidData = data.filter((data) => data.status.toLowerCase() === "unpaid");
            const pendingData = data.filter((data) => data.status.toLowerCase() === "pending");
            setUnpaidTransaction(unpaidData);
            setPendingTransaction(pendingData);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const updateComponentHandler = (order_id, paymentProofImageUrl) => {
        const selectedTransaction = unpaidTransaction.find(order => order.id === order_id);
        selectedTransaction.status = "pending";
        selectedTransaction.image_payment_url = paymentProofImageUrl;
        setUnpaidTransaction(oldUnpaid => oldUnpaid.filter(order => order.id !== order_id));
        setPendingTransaction(oldPending => [selectedTransaction, ...oldPending]);
    }

    return (
        <Container>
            <Row className="profile g-4">
                <Col xs={12} lg={3}>
                    <Sidebar />
                </Col>
                <Col xs={12} lg={9}>
                    <div className="custom-tab">
                        <Tabs defaultActiveKey="awaiting-payment" id="transaction-tab">
                            <Tab eventKey="awaiting-payment" title={`Menunggu pembayaran (${unpaidTransaction.length})`}>
                                <span className="info-payment">Pesanan akan hangus jika tidak dibayar selama 24 jam</span>
                                {isLoading ? (
                                    <Col>
                                        <TransactionCard isLoading={isLoading} />
                                    </Col>
                                ) : (
                                    unpaidTransaction.map(unpaidTransaction => (
                                        <Col key={unpaidTransaction.id}>
                                            <TransactionCard transaction={unpaidTransaction} status="unpaid" isLoading={isLoading} onUpdate={updateComponentHandler} />
                                        </Col>
                                    )))}
                            </Tab>
                            <Tab eventKey="awaiting-confirmation" title={`Sedang konfirmasi (${pendingTransaction.length})`}>
                                <span className="info-confirmation">Pesananmu akan dikemas setelah pembayaran terkonfirmasi</span>
                                {isLoading ? (
                                    <Col>
                                        <TransactionCard isLoading={isLoading} />
                                    </Col>
                                ) : (
                                    pendingTransaction.map(pendingTransaction => (
                                        <Col key={pendingTransaction.id}>
                                            <TransactionCard transaction={pendingTransaction} status="paid" isLoading={isLoading} onUpdate={updateComponentHandler} />
                                        </Col>
                                    )))}
                            </Tab>
                            {/* <Tab eventKey="shipping" title="Sedang dikirim">
                            </Tab>
                            <Tab eventKey="delivered" title="Sudah sampai">
                            </Tab>
                            <Tab eventKey="done" title="Selesai">
                            </Tab> */}
                        </Tabs>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Transaction;