import { useField } from 'formik';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import CreateForm from './CreateForm/CreateForm';
import SelectProducts from './SelectProducts/SelectProducts';

const CreateInspireMeModal = ({ show, onClose, onPosted }) => {
  const [postedPhoto, setPostedPhoto] = useState(null);
  const [section, setSection] = useState('form');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [caption, setCaption] = useState('');

  const sectionToForm = () => {
    setSection('form');
  };

  const sectionToProducts = () => {
    setSection('products');
  };

  const selectDoneHandler = (selected) => {
    setSelectedProducts(selected);
    setSection('form');
  };

  const submitHandler = (postData) => {
    setSelectedProducts([]);
    setCaption('');
    setPostedPhoto(null);
    onPosted(postData);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      {section === 'form' &&
        <CreateForm
          onClose={onClose}
          onAddProduct={sectionToProducts}
          selectedProducts={selectedProducts}
          onPosted={submitHandler}
          captionField={{ value: caption, set: setCaption }}
          postedPhoto={{ value: postedPhoto, set: setPostedPhoto }}
        />
      }
      {section === 'products' &&
        <SelectProducts onDone={selectDoneHandler} onCancel={sectionToForm} selectedProducts={selectedProducts} />
      }
    </Modal>
  )
}

export default CreateInspireMeModal
