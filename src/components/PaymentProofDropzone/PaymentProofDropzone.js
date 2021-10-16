import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

import './PaymentProofDropzone.scss';

import CloudUploadImage from '../../assets/images/bi_cloud-upload.png';
import { ReactComponent as XIcon } from '../SVG/x.svg';

const PaymentProofDropzone = ({ closeFunc, ...props }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: '.jpeg,.png,.pdf',
    onDrop: (acceptedFiles) => setUploadedFile(acceptedFiles[0])
  });
  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };
  const uploadFileHandler = () => {
    closeModal();
    setUploadedFile(null);
  }
  const deleteFileHandler = () => {
    setUploadedFile(null);
  };

  return (
    <Modal {...props}>
      <Modal.Body>
        <p className="h3 text-center mb-3">Upload Bukti Pembayaran</p>
        <div {...getRootProps({ className: "border-2 d-flex flex-column p-4 payment-dropzone" })}>
          <input {...getInputProps()} />
          <img className="col-5 mx-auto" src={CloudUploadImage} alt="upload_illustration" />
          {!isDragActive && !!!uploadedFile && !isDragAccept &&
            <>
              <p className="text-gray mb-1 text-center">Drag and drop bukti pembayaran disini</p>
              <p className="text-gray text-center">atau</p>
            </>
          }
          {isDragActive &&
            <p className="text-gray mb-3 text-center">Lepaskan file</p>
          }
          {!isDragActive && !!uploadedFile &&
            <div className="d-flex justify-content-between align-items-center border mb-3 p-2">
              <p className="text-gray mb-0">{uploadedFile.name}</p>
              <XIcon className="icon mb-0 text-gray" role="button" onClick={deleteFileHandler} />
            </div>
          }
          {!!uploadedFile
            ? <button className="btn btn-black rounded-0" onClick={uploadFileHandler}>Upload bukti</button>
            : <button className="btn btn-black rounded-0" onClick={open}>Pilih file</button>
          }
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentProofDropzone;