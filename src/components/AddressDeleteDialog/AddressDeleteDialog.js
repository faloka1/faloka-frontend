import React from 'react';
import { Modal } from 'react-bootstrap';

const AddressDeleteDialog = ({ closeFunc, deleteHandler, ...props }) => {
  const closeModal = () => {
    if (closeFunc) {
      closeFunc();
    }
  };

  const yesHandler = () => {
    if (deleteHandler) {
      deleteHandler();
      closeModal();
    }
  };

  const noHandler = () => {
    closeModal();
  };

  return (
    <Modal {...props} className="">
      <Modal.Body className="p-4">
        <p className="h5 text-center">Hapus Alamat</p>
        <p className="text-center mb-4">Yakin ingin menghapus alamat ini? Kamu tidak bisa mengembalikan alamat ini ketika sudah dihapus.</p>
        <div className="d-flex justify-content-center">
          <button className="btn btn-black btn-black--invert rounded-0 px-4" onClick={noHandler}>Batal</button>
          <button className="btn btn-black ms-2 rounded-0 px-4" onClick={yesHandler}>Hapus</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddressDeleteDialog;