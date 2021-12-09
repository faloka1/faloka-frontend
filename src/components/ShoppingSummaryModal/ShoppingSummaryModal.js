import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Spinner } from 'react-bootstrap';

import './ShoppingSummaryModal.scss';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import { CONFIRM_CHECKOUT } from '../../context/CheckoutContext/CheckoutActions';
import postCheckoutData from '../../helpers/api/post-checkout-data';
import concatAddress from '../../helpers/concat-address';
import ItemsExpeditionSummary from '../ItemsSummary/ItemsExpeditionSummary';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';
import { completeCheckout } from '../../stores/cart/cart-actions';

const ShoppingSummaryModal = ({ closeFunc, ...props }) => {
  const history = useHistory();
  const reduxDispatch = useDispatch();
  const {
    dispatch,
    is_confirmed,
    items,
    total_quantity,
    payment_method,
    shipment_address,
    total_items_price,
    total_expedition_cost
  } = useContext(CheckoutContext);

  const { mutate, isLoading } = useMutation(async checkoutData => {
    const response = await postCheckoutData(checkoutData);

    return response.data;
  }, {
    onSuccess: (data) => {
      dispatch({ type: CONFIRM_CHECKOUT, payload: { order_id: data.order_id } });

      const cartIds = items.reduce((ids, item) => {
        const idsTemp = item.items.reduce((accumulator, i) => {
          if (!!!i.id) {
            return [...accumulator];
          }

          return [...accumulator, i.id];
        }, []);

        return [...ids, ...idsTemp];
      }, []);

      reduxDispatch(completeCheckout(cartIds));
      if (closeFunc) {
        closeModal();
      }

      history.push('/checkout/finish');
    },
    onError: (err) => console.log(err),
  });

  if (!!!payment_method || items.length < 1) {
    return null;
  }

  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };

  const finishHandler = async () => {
    const checkoutObject = {
      payment_id: payment_method.id,
      address_id: shipment_address.address.id,
      order_brands: items.map(item => {
        return {
          brand_id: item.brand_id,
          shipping_price: item.expedition.cost,
          expedition_name: item.expedition.code,
          service: item.expedition.service,
          items: item.items.map(i => {
            return {
              quantity: i.quantity,
              variant_id: i.variant_id,
              product_id: i.product_id,
            };
          }),
        };
      }),
    };

    mutate(checkoutObject);
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
            <p className="fw-bold mb-2 summary-section__title border-bottom pb-2">Pembayaran</p>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Metode Pembayaran</p>
              <div>
                <p className="fw-bold text-end mb-0">Transfer {payment_method.payment_name}</p>
                <p>{payment_method.no_rekening} ({payment_method.account_name})</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Total produk ( {total_quantity} barang )</p>
              <CurrencyFormatter value={total_items_price} renderText={value => <p className="fw-bold">{value}</p>} />
            </div>
            <div className="d-flex justify-content-between">
              <p className="text-gray">Ongkos Pengiriman</p>
              <CurrencyFormatter value={total_expedition_cost} renderText={value => <p className="fw-bold">{value}</p>} />
            </div>
            <div className="d-flex justify-content-between border-top pt-2">
              <p className="text-uppercase mb-0">Total Pembayaran</p>
              <CurrencyFormatter value={total_expedition_cost + total_items_price} renderText={value => <p className="fw-bold text-accent mb-0">{value}</p>} />
            </div>
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="fw-bold mb-3 summary-section__title">Daftar Produk</p>
            {items.map(item => (
              <ItemsExpeditionSummary key={item.slug} brandName={item.name} items={item.items} expedition={item.expedition} itemsOnly className="mb-2" />
            ))}
          </div>
        </section>
        <section className="summary-section">
          <div className="summary-section__container">
            <p className="fw-bold mb-3 summary-section__title border-bottom pb-2">Alamat Pengiriman</p>
            <p className="fw-bold">{shipment_address.name}</p>
            <p>{concatAddress(shipment_address.address)}</p>
            <p className="mb-0">{shipment_address.phone_number}</p>
          </div>

          <div className="px-3 my-3">
            {!is_confirmed && !isLoading &&
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
            {is_confirmed &&
              <Button
                className="btn-black confirm-btn text-center p-3 d-inline-block w-100"
                onClick={closeModal}
              >
                Tutup
              </Button>
            }
          </div>
        </section>
      </Modal.Body>
    </Modal >
  )
}

export default ShoppingSummaryModal;