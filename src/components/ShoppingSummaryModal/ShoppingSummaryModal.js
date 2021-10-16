import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import ProductsSummary from '../ProductsSummary/ProductsSummary';

import './ShoppingSummaryModal.scss';

const ShoppingSummaryModal = ({ closeFunc, ...props }) => {
  const { isConfirmed, setIsConfirmed, product } = useContext(CheckoutContext);

  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };

  const finishHandler = (values) => {
    if (closeFunc) {
      setIsConfirmed(true);
      closeModal();
    }
  };

  return (
    <Modal {...props}>
      <Modal.Body className="p-0 shopping-summary">
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="h4 text-center">Detail Transaksi</p>
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="h5 mb-3 summary-section__title">Daftar Produk</p>
            <ProductsSummary productCart={product} productsOnly />
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="h5 mb-3 summary-section__title">Pengiriman</p>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Alamat</p>
              <p className="fw-bold">Rungkut Asri Utara 15 No. 19</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Metode</p>
              <p className="fw-bold">JNE</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Tipe</p>
              <p className="fw-bold">Express</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Ongkos Kirim</p>
              <p className="fw-bold text-accent">Rp13.000,-</p>
            </div>
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="h5 mb-3 summary-section__title">Pembayaran</p>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Metode Pembayaran</p>
              <div>
                <p className="fw-bold text-end mb-0">Transfer BNI</p>
                <p>12312312 (ela)</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Subtotal ( 1 item )</p>
              <p className="fw-bold">JNE</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Ongkos Kirim</p>
              <p className="fw-bold">Rp13.000,-</p>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Total Pembayaran</p>
              <p className="fw-bold text-accent">Rp100.000,-</p>
            </div>
          </div>
        </section>
        <div className="px-3 my-3">
          {!isConfirmed &&
            <Link
              to="/checkout/finish"
              className="btn-black confirm-btn text-center p-3 d-inline-block w-100"
              onClick={finishHandler}
            >
              Bayar
            </Link>
          }
          {isConfirmed &&
            <Link
              to="/checkout/finish"
              className="btn-black confirm-btn text-center p-3 d-inline-block w-100"
              onClick={closeModal}
            >
              Tutup
            </Link>
          }
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ShoppingSummaryModal;