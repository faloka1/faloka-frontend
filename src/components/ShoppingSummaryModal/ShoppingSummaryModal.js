import React, { useContext } from 'react'
import { Modal } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import concatAddress from '../../helpers/concat-address';
import ProductsSummary from '../ProductsSummary/ProductsSummary';

import './ShoppingSummaryModal.scss';

const ShoppingSummaryModal = ({ closeFunc, ...props }) => {
  const {
    isConfirmed,
    setIsConfirmed,
    product,
    paymentMethod,
    expedition,
    shipmentAddress
  } = useContext(CheckoutContext);

  if (!!!paymentMethod || !!!product.product || !!!expedition.cost) {
    return null;
  }

  const itemPrice = product.product.price;
  const quantity = product.quantity;
  const itemsPrice = itemPrice * quantity;
  const shipmentCost = expedition.cost.cost[0].value;

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
            <p className="h5 mb-2 summary-section__title border-bottom pb-2">Pengiriman</p>
            <div className="d-flex justify-content-between mb-1">
              <p className="text-gray mb-0">Metode</p>
              <p className="fw-bold mb-0">{expedition.name}</p>
            </div>
            <div className="d-flex justify-content-between border-bottom pb-2">
              <p className="text-gray mb-0">Type</p>
              <p className="fw-bold mb-0">{expedition.cost.service} ({expedition.cost.description})</p>
            </div>
            <p className="text-gray my-2">Alamat</p>
            <p className="fw-bold">{shipmentAddress.name}</p>
            <p>{concatAddress(shipmentAddress.address)}</p>
            <p>{shipmentAddress.phoneNumber}</p>
            <div className="d-flex justify-content-between border-top pt-2">
              <p className="text-uppercase mb-0">Ongkos Pengiriman</p>
              <CurrencyFormat
                value={shipmentCost}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p className="fw-bold text-accent mb-0">{value}</p>}
              />
            </div>
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="h5 mb-2 summary-section__title border-bottom pb-2">Pembayaran</p>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Metode Pembayaran</p>
              <div>
                <p className="fw-bold text-end mb-0">Transfer {paymentMethod.payment_name}</p>
                <p>{paymentMethod.no_rekening} ({paymentMethod.account_name})</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Subtotal ( {quantity} item )</p>
              <CurrencyFormat
                value={itemsPrice}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p className="fw-bold">{value}</p>}
              />
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Ongkos Pengiriman</p>
              <CurrencyFormat
                value={shipmentCost}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p className="fw-bold">{value}</p>}
              />
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <p className="text-uppercase mb-0">Total Pembayaran</p>
              <CurrencyFormat
                value={(shipmentCost + itemsPrice)}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p className="fw-bold text-accent mb-0">{value}</p>}
              />
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