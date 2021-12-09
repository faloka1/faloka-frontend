import { React, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Modal, Row, Col } from 'react-bootstrap';

import './TransactionDetailModal.scss';

import CurrencyFormat from 'react-currency-format';
import getUserProfile from '../../helpers/api/get-user-profile';
import TransactionProductCard from '../../components/User/TransactionCard/TransactionProductCard/TransactionProductCard';


const TransactionDetailModal = ({ setDropZoneOn, showProof, close, transaction, ...props }) => {
  var totalProduct = 0;
  var totalProductPrice = 0;
  var totalShippingPrice = 0;
  var totalBrandPrice = 0;

  const [profileData, setProfileData] = useState('');

  useQuery('user-data', async () => {
    const response = await getUserProfile();
    return response.data;
  }, {
    onSuccess: (data) => {
      setProfileData(data);
    },
    onError: (err) => {
      console.log(err);
    }
  });

  const closeDetailModal = () => {
    if (close) {
      close();
    }
  };

  const showUploadModal = () => {
    closeDetailModal()
    setDropZoneOn()
  };

  const showProofModal = () => {
    closeDetailModal()
    showProof()
  };

  const paymentStatus = transaction.image_payment_url === null ? (
    <Link to="#" onClick={showUploadModal}>Upload</Link>
  ) : (
    <Link to="#" onClick={showProofModal}>Lihat</Link>
  );

  return (
    <Modal className="transaction-detail-modal" {...props} centered>
      <Modal.Header closeButton={true}>
        <Modal.Title>Detail Transaksi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="detail-payment">
          <div className="payment-header">
            <h6>PEMBAYARAN</h6>
          </div>
          <div className="payment-content">
            <Row>
              <Col className="content-left">Metode Pembayaran</Col>
              <Col className="content-right">
                <span className="right-bank">{transaction.payment.payment_name}</span>
                <span className="right-account">{transaction.payment.no_rekening} ({transaction.payment.account_name})</span>
              </Col>
            </Row>
            <Row>
              {transaction.order_brands.map(order_brands => {
                totalProduct += order_brands.order_details.length
                totalShippingPrice += order_brands.shipping.shipping_price
                order_brands.order_details.map(order_details => {
                  totalProductPrice += order_details.quantity * order_details.products.price
                })
              })}
              <Col className="content-left">Total Produk ({totalProduct} barang)</Col>
              <Col className="content-right">
                <CurrencyFormat value={totalProductPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
              </Col>
            </Row>
            <Row>
              <Col className="content-left">Total Ongkos Kirim</Col>
              <Col className="content-right">
                <CurrencyFormat value={totalShippingPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
              </Col>
            </Row>
            <Row>
              <Col className="content-left">Bukti Pembayaran</Col>
              <Col className="content-right payment-proof">
                {paymentStatus}
              </Col>
            </Row>
          </div>
          <div className="payment-footer">
            <Row>
              <Col className="content-left">TOTAL PEMBAYARAN</Col>
              <Col className="content-right price">
                <CurrencyFormat value={totalProductPrice + totalShippingPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
              </Col>
            </Row>
          </div>
        </div>
        <div className="detail-product">
          <div className="product-header">
            <h6>DAFTAR PRODUK</h6>
          </div>
          <div className="product-content">
            {transaction.order_brands.map(order_brands => {
              totalBrandPrice = 0
              return (
                <div className="content-brand" key="view">
                  <div className="brand-name">
                    {order_brands.brand.name}
                  </div>
                  <div className="brand-product">
                    <div className="product-list">
                      {order_brands.order_details.map((order_details, index) => {
                        totalBrandPrice += order_details.quantity * order_details.products.price
                        return (<TransactionProductCard key={order_details.id} product={order_details} />)
                      })}
                    </div>
                    <Row className="product-total">
                      <Col className="content-left">Total Produk</Col>
                      <Col className="content-right price">
                        <CurrencyFormat value={totalBrandPrice} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
                      </Col>
                    </Row>
                  </div>
                  <div className="brand-shipping">
                    <div className="shipping-header">
                      PENGIRIMAN
                    </div>
                    <div className="shipping-content">
                      <Row>
                        <Col className="content-left">Metode</Col>
                        <Col className="content-right">{(order_brands.shipping.expedition_name).toUpperCase()}</Col>
                      </Row>
                      <Row>
                        <Col className="content-left">Type</Col>
                        <Col className="content-right">{(order_brands.shipping.service).toUpperCase()}</Col>
                      </Row>
                      <Row>
                        <Col className="content-left total">Total Pengiriman</Col>
                        <Col className="content-right price">
                          <CurrencyFormat value={order_brands.shipping.shipping_price} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <div className="brand-subtotal">
                    <Row className="subtotal-content">
                      <Col className="content-left total">Sub Total</Col>
                      <Col className="content-right price">
                        <CurrencyFormat value={totalBrandPrice + order_brands.shipping.shipping_price} displayType={'text'} prefix={'Rp'} thousandSeparator="." decimalSeparator="," />
                      </Col>
                    </Row>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="detail-address">
          <div className="address-header">
            <h6>ALAMAT PENGIRIMAN</h6>
          </div>
          <div className="address-content">
            <span className="content-name">{profileData.name}</span>
            <span className="content-address">{transaction.address.location}</span>
            <span className="content-city">{transaction.address.sub_district}, {transaction.address.districts.title}, {transaction.address.provinces.title} {transaction.address.postal_code}</span>
            <span className="content-phone">{profileData.phone_number}</span>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionDetailModal;