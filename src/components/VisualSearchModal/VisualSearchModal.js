import React, { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import { useHistory } from 'react-router';

import './VisualSearchModal.scss';

import CloudUploadImage from '../../assets/images/bi_cloud-upload.png';
import { ReactComponent as XIcon } from '../SVG/x.svg';

const VisualSearchModal = ({ onClose, onError, onSuccess, ...props }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const history = useHistory();

  const { getRootProps, getInputProps, open, isDragActive, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    multiple: false,
    accept: '.jpg,.jpeg',
    onDrop: (acceptedFiles) => setUploadedFile(acceptedFiles[0])
  });

  const searchHandler = () => {
    if (!!uploadedFile) {
      onClose();
      history.push({
        pathname: '/visual-search',
        state: uploadedFile
      });
    }
  };

  const deleteFileHandler = () => {
    setUploadedFile(null);
  };

  const content = (
    <>
      <img className="mx-auto" src={CloudUploadImage} alt="upload_illustration" />
      {!isDragActive && !!!uploadedFile && !isDragAccept &&
        <>
          <p className="text-gray mt-3 mb-0 text-center">Drag and drop gambar disini</p>
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
        ? <button className="btn btn-black rounded-0" onClick={searchHandler}>Cari</button>
        : <button className="btn btn-black rounded-0" onClick={open}>Pilih file</button>
      }
    </>
  );

  return (
    <Modal className="visual-search-modal" {...props}>
      <Modal.Header>
        <Modal.Title>Upload Gambar Outfit yang Ingin Kamu Cari</Modal.Title>
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

export default VisualSearchModal;