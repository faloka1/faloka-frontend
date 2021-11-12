import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useMutation } from 'react-query';

import './PaymentProofDropzone.scss';

import CloudUploadImage from '../../assets/images/bi_cloud-upload.png';
import { ReactComponent as XIcon } from '../SVG/x.svg';
import uploadPaymentProof from '../../helpers/api/upload-payment-proof';

const PaymentProofDropzone = ({ closeFunc, orderId, onError, onSuccess, ...props }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const { mutate, isLoading } = useMutation(async (file) => {
    const formData = new FormData();
    formData.append('_method', 'PATCH');
    formData.append('image', file);

    const response = await uploadPaymentProof(orderId, formData);

    return response;
  }, {
    onError: (err) => {
      if (onError) {
        onError();
      }
      console.log(err);
    },
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }

      closeModal();
      setUploadedFile(null);
    },
  });

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: '.jpeg,.png',
    onDrop: (acceptedFiles) => setUploadedFile(acceptedFiles[0])
  });

  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };

  const uploadFileHandler = async () => {
    if (!!uploadedFile) {
      mutate(uploadedFile);
    }
  };

  const deleteFileHandler = () => {
    setUploadedFile(null);
  };

  const content = !isLoading
    ? (
      <>
        <img className="mx-auto" src={CloudUploadImage} alt="upload_illustration" />
        {!isDragActive && !!!uploadedFile && !isDragAccept &&
          <>
            <p className="text-gray mt-3 mb-0 text-center">Drag and drop bukti pembayaran disini</p>
            <p className="text-gray text-center">atau</p>
          </>
        }
        {isDragActive &&
          <p className="text-gray mt-3 mb-3 text-center">Lepaskan file</p>
        }
        {!isDragActive && !!uploadedFile &&
          <div className="d-flex justify-content-between align-items-center border mt-4 mb-3 p-2 file-name">
            <p className="text-gray mb-0">{uploadedFile.name}</p>
            <XIcon className="icon mb-0 text-gray" role="button" onClick={deleteFileHandler} />
          </div>
        }
        {!!uploadedFile
          ? <button className="btn btn-black rounded-0" onClick={uploadFileHandler}>Upload bukti</button>
          : <button className="btn btn-black rounded-0" onClick={open}>Pilih file</button>
        }
      </>)
    : (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" className="login-loading">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );

  return (
    <Modal className="payment-proof-upload-modal" {...props}>
      <Modal.Header>
        <Modal.Title>Upload Bukti Pembayaran</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div {...getRootProps({ className: "border-2 d-flex flex-column align-items-center payment-dropzone" })}>
          <input {...getInputProps()} />
          {content}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentProofDropzone;