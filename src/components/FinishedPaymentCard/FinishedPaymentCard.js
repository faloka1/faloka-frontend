import React, { useContext, useState } from 'react'
import { Card } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import useToggle from '../../hooks/use-toggle';
import PaymentProofDropzone from '../PaymentProofDropzone/PaymentProofDropzone';
import ShoppingSummaryModal from '../ShoppingSummaryModal/ShoppingSummaryModal';

const FinishedPaymentCard = ({ className }) => {
  const { toggle, setToggleOn, setToggleOff } = useToggle();
  const [isUploaded, setIsUploaded] = useState(false);
  const {
    toggle: dropZoneToggle,
    setToggleOn: setDropZoneOn,
    setToggleOff: setDropZoneOff
  } = useToggle();
  const { order_id, total_expedition_cost, total_items_price } = useContext(CheckoutContext);
  let classes = 'rounded-0';

  if (className) {
    classes += ` ${className}`;
  }

  const uploadSuccessHandler = () => {
    setIsUploaded(true);
  };

  return (
    <>
      <PaymentProofDropzone show={dropZoneToggle} onSuccess={uploadSuccessHandler} closeFunc={setDropZoneOff} onHide={setDropZoneOff} orderId={order_id} centered />
      <ShoppingSummaryModal show={toggle} closeFunc={setToggleOff} onHide={setToggleOff} />
      <Card className={classes}>
        <Card.Body>
          <p className="text-center text-danger mb-0">Pesanan akan hangus jika tidak dibayar selama 24 jam</p>
        </Card.Body>
        <Card.Body className="border border-start-0 border-end-0 border-top border-bottom">
          <div className="d-flex justify-content-between">
            <p className="text-gray">Metode Pembayaran</p>
            <p className="fw-bold">Transfer BNI</p>
          </div>
          <div className="d-flex justify-content-between mb-4">
            <p className="text-gray">Kode Pembayaran</p>
            <p className="fw-bold">21231231 (Ela)</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-gray">
              Total Pembayaran
              <span className="ms-2 text-info" role="button" onClick={setToggleOn}><small>Lihat rincian</small></span>
            </p>
            <CurrencyFormat
              value={total_expedition_cost + total_items_price}
              displayType={'text'}
              prefix={'Rp'}
              thousandSeparator="."
              decimalSeparator=","
              renderText={value => <p className="fw-bold text-accent">{value}</p>}
            />
          </div>
        </Card.Body>
        <Card.Body>
          {!isUploaded &&
            <>
              <p className="btn-black text-center py-2" onClick={setDropZoneOn}>Upload bukti pembayaran</p>
              <Link to="/user/transaction" className="btn-black d-block btn-black--invert text-center py-2 mb-0">Bayar nanti</Link>
            </>
          }
          {isUploaded &&
            <>
              <p className="text-accent text-center">Bukti pembayaran berhasil di-upload</p>
              <Link className="btn btn-black d-block text-center py-2 mb-0 rounded-0" to="/">Kembali ke beranda</Link>
            </>
          }
        </Card.Body>
      </Card>
    </>
  );
};

export default FinishedPaymentCard
