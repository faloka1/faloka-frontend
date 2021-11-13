import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import CreateForm from './CreateForm/CreateForm';
import SelectProducts from './SelectProducts/SelectProducts';

const CreateInspireMeModal = ({ show, onClose }) => {
  const [section, setSection] = useState('form');

  const sectionToForm = () => {
    setSection('form');
  };

  const sectionToProducts = () => {
    setSection('products');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      {section === 'form' &&
        <CreateForm onClose={onClose} onAddProduct={sectionToProducts} />
      }
      {section === 'products' &&
        <SelectProducts onDone={sectionToForm} onCancel={sectionToForm} />
      }
    </Modal>
  )
}

export default CreateInspireMeModal
