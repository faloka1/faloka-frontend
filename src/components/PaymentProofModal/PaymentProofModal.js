import { React, useState }from 'react';
import { Modal, Image, Spinner } from 'react-bootstrap';
import { BASE_CONTENT_URL } from '../../config/api';
import './PaymentProofModal.scss';

const PaymentProofModal = ({ image, ...props }) => {
  const [pictureLoaded, setPictureLoaded] = useState(false);

  const handleImageLoaded = () => {
      setPictureLoaded(true);
  }

  return (
    <Modal className="payment-proof-modal" {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bukti Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!pictureLoaded && 
            <Spinner animation="border"role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          }
          <Image className={!pictureLoaded ? 'd-none' : ''} onLoad={handleImageLoaded} src={`${BASE_CONTENT_URL}${image}`} thumbnail />
        </Modal.Body>
    </Modal>
  );
};

export default PaymentProofModal;