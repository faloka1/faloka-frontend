import React from 'react'
import { Card } from 'react-bootstrap';
import useToggle from '../../hooks/use-toggle';
import ShoppingSummaryModal from '../ShoppingSummaryModal/ShoppingSummaryModal';

const FinishedPaymentCard = ({ className }) => {
  const { toggle, setToggleOn, setToggleOff } = useToggle();
  let classes = 'rounded-0';

  if (className) {
    classes += ` ${className}`;
  }

  return (
    <>
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
              <span className="ms-2 text-info " role="button" onClick={setToggleOn}><small>Lihat rincian</small></span>
            </p>
            <p className="fw-bold text-accent">Rp80000</p>
          </div>
        </Card.Body>
        <Card.Body>
          <p className="btn-black text-center py-2">Upload bukti pembayaran</p>
          <p className="btn-black btn-black--invert text-center py-2 mb-0">Bayar nanti</p>
        </Card.Body>
      </Card>
    </>
  );
};

export default FinishedPaymentCard
