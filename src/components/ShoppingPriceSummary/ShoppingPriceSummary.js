import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './ShoppingPriceSummary.scss';

import { CheckoutContext, SHIPMENT_PAGE, PAYMENT_PAGE } from '../../context/CheckoutContext/CheckoutContext';
import ShoppingSummaryModal from '../ShoppingSummaryModal/ShoppingSummaryModal';
import useToggle from '../../hooks/use-toggle';
import CurrencyFormat from 'react-currency-format';

const ShoppingPriceSummary = () => {
  const {
    currentPage,
    setCurrentPage,
    isConfirmed,
    paymentMethod,
    product,
    expedition,
    shipmentAddress
  } = useContext(CheckoutContext);
  const { toggle, setToggleOn, setToggleOff } = useToggle();
  const shipmentNextDisabled = !!!expedition.cost || !!!shipmentAddress.address;
  const expeditionCost = !!expedition.cost ? expedition.cost.cost[0].value : 0;
  const itemsPrice = product.product?.price * product.quantity;

  const actionButton = currentPage === SHIPMENT_PAGE
    ? <Link
      to="/checkout/payment"
      className={`btn-black pay-btn w-100 d-inline-block w-100 text-center py-2 mt-2 ${shipmentNextDisabled ? 'disabled' : ''}`}
      disabled={shipmentNextDisabled}
      onClick={() => { setCurrentPage(PAYMENT_PAGE); console.log('test') }}
    >Lanjut Bayar</Link>
    : currentPage === PAYMENT_PAGE && !isConfirmed
      ? <p
        className={`btn-black w-100 d-inline-block text-center py-2 mt-2 mb-0 ${!!!paymentMethod ? 'disabled' : ''}`}
        onClick={() => setToggleOn()}
      >Konfirmasi Detail Pembayaran</p>
      : currentPage === PAYMENT_PAGE && isConfirmed
        ? <div className="d-flex flex-column">
          <p className="btn-black text-center py-2">Upload bukti pembayaran</p>
          <p className="btn-black btn-black--invert text-center py-2 mb-0">Bayar nanti</p>
        </div> : '';

  return (
    <>
      <ShoppingSummaryModal show={toggle} onHide={setToggleOff} closeFunc={setToggleOff} centered />
      <Card className="shopping-price-summary">
        <Card.Body>
          <Card.Title className="mb-4"><strong>Ringkasan Jumlah</strong></Card.Title>
          <div className="d-flex justify-content-between">
            <p>Total Harga ( {product.quantity} barang )</p>
            <CurrencyFormat
              value={itemsPrice}
              displayType={'text'}
              prefix={'Rp'}
              thousandSeparator="."
              decimalSeparator=","
              renderText={value => <p>{value}</p>}
            />
          </div>
          <div className="d-flex justify-content-between">
            <p>Biaya Ongkir</p>
            {!!!expedition.cost && <p>-</p>}
            {!!expedition.cost &&
              <CurrencyFormat
                value={expeditionCost}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p>{value}</p>}
              />
            }
          </div>
          <div className="d-flex justify-content-between mt-3">
            <p>Total Belanja</p>
            {!!expedition.cost &&
              <CurrencyFormat
                value={expeditionCost + itemsPrice}
                displayType={'text'}
                prefix={'Rp'}
                thousandSeparator="."
                decimalSeparator=","
                renderText={value => <p className="total-price"><strong>{value}</strong></p>}
              />
            }
          </div>
          {actionButton}
        </Card.Body>
      </Card>
    </>
  );
};

export default ShoppingPriceSummary;