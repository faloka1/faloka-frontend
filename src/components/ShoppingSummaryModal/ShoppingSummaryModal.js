import React, { useContext } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useMutation } from 'react-query';
import { Spinner } from 'react-bootstrap';

import './ShoppingSummaryModal.scss';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import postCheckoutData from '../../helpers/api/post-checkout-data';
import concatAddress from '../../helpers/concat-address';
import ProductsSummary from '../ProductsSummary/ProductsSummary';


const ShoppingSummaryModal = ({ closeFunc, ...props }) => {
  const history = useHistory();
  const {
    isConfirmed,
    setIsConfirmed,
    product,
    paymentMethod,
    expedition,
    shipmentAddress,
    setOrderId,
    setTotalPrice
  } = useContext(CheckoutContext);
  const { mutate, isLoading } = useMutation(async checkoutData => {
    const response = await postCheckoutData(checkoutData);

    return response.data;
  }, {
    onSuccess: (data) => {
      setOrderId(data.order_id);
      setIsConfirmed(true);
      setTotalPrice(totalPrice);
      if (closeFunc) {
        closeModal();
      }

      history.push('/checkout/finish');
    },
    onError: (err) => console.log(err),
  });

  if (!!!paymentMethod || !!!product.product || !!!expedition.cost) {
    return null;
  }

  const itemPrice = product.product.price;
  const quantity = product.quantity;
  const itemsPrice = itemPrice * quantity;
  const shipmentCost = expedition.cost.cost[0].value;
  const totalPrice = shipmentCost + itemsPrice;

  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };

  const finishHandler = async () => {
    mutate({
      shipping_price: shipmentCost,
      expedition_name: expedition.code,
      payment_id: paymentMethod.id,
      address_id: shipmentAddress.address.id,
      quantity: quantity,
      variant_id: product.product.variants[0].id,
      service: expedition.cost.service
    });
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
                value={totalPrice}
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
          {!isConfirmed && !isLoading &&
            <Button
              className="btn-black confirm-btn text-center p-3 d-inline-block w-100"
              onClick={finishHandler}
            >
              Bayar
            </Button>
          }
          {isLoading &&
            <Button
              className="btn-black confirm-btn text-center p-3 d-inline-block w-100 disabled"
              disabled={isLoading}
            >
              <Spinner animation="border" role="status" className="loading">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Button>
          }
          {isConfirmed &&
            <Button
              className="btn-black confirm-btn text-center p-3 d-inline-block w-100"
              onClick={closeModal}
            >
              Tutup
            </Button>
          }
        </div>
      </Modal.Body>
    </Modal >
  )
}

export default ShoppingSummaryModal;