import React, { useRef, useState } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './InspireMeForm.scss';

import { ReactComponent as PlusIcon } from '../../SVG/plus.svg';

const validationSchema = Yup.object({
  title: Yup.string().required('Harus diisi.'),
  caption: Yup.string().required('Harus diisi.'),
});

const CreateForm = ({ onClose, onAddProduct }) => {
  const [displayedPhoto, setDisplayedPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const photoInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  const initialValues = {
    title: '',
    caption: ''
  };

  const cancelHandler = () => {
    onClose();
  };

  const addProductHandler = () => {
    onAddProduct();
  };

  const addPhotoClickHandler = () => {
    photoInputRef.current.click();
  };

  const photoInputChangeHandler = (event) => {
    setPhotoError(false);
    const file = event.target.files[0];
    const photo = URL.createObjectURL(file);

    setDisplayedPhoto(photo);
  };

  const submitClickHandler = () => {
    submitButtonRef.current.click();
    if (!!!displayedPhoto) {
      setPhotoError(true);
    }
  };

  const submitHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Modal.Body>
        <p className="fs-4 text-center">Share Gaya Outfitmu</p>
        <div className="d-flex justify-content-center cursor-pointer mb-2" >
          {!!!displayedPhoto &&
            <div className="border d-inline-block text-center py-3 px-5 btn rounded-0" onClick={addPhotoClickHandler}>
              <PlusIcon style={{ width: '3rem' }} color={"gray"} />
            </div>
          }
          {!!displayedPhoto &&
            <img src={displayedPhoto} alt='outfit' className="w-50" />
          }
        </div>
        {photoError &&
          <p className="text-danger text-center">Belum upload foto.</p>
        }
        {!!displayedPhoto &&
          <p className="text-muted text-center btn mx-auto d-block" onClick={addPhotoClickHandler}>Ganti foto</p>
        }
        {!!!displayedPhoto &&
          <p className="text-muted text-center">Upload Foto Outfitmu</p>
        }
        <Formik
          initialValues={initialValues}
          onSubmit={submitHandler}
          validationSchema={validationSchema}
        >
          <Form encType="multipart/form-data">
            <div className="form-group mb-2">
              <label htmlFor="title">Judul Postingan</label>
              <Field className="form-control rounded-0" type="text" id="title" name="title" placeholder="ex: Outfit Senja" />
              <ErrorMessage name="title" render={(msg) => <p className="text-danger">{msg}</p>} />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="caption">Caption</label>
              <Field name="caption">
                {({ field }) => (
                  <textarea className="form-control rounded-0" rows="4" id="caption" onChange={field.onChange} name="caption" placeholder="ex: Outfit ini bakal cocok untuk kalian yang mau dapet foto senja" value={field.value}></textarea>
                )}
              </Field>
              <ErrorMessage name="caption" render={(msg) => <p className="text-danger">{msg}</p>} />
            </div>
            <input ref={photoInputRef} type="file" name="photo" accept=".jpg,.png,.jpeg" className="d-none" onChange={photoInputChangeHandler} />
            <p>Bagikan informasi product yang mungkin sesuai dengan outfitmu</p>
            <Row className="inspire-me-form__products">
              <Col xs={4} className="mb-3">
                <img src="/assets/images/products/product_3.png" alt="h-auto" className="w-100" />
              </Col>
              <Col xs={4} className="mb-3">
                <img src="/assets/images/products/product_4.png" alt="h-auto" className="w-100" />
              </Col>
              <Col xs={4} className="mb-3">
                <img src="/assets/images/products/product_4.png" alt="h-auto" className="w-100" />
              </Col>
              <Col xs={4} className="mb-3" style={{ height: '100px' }} onClick={addProductHandler}>
                <div className="border d-flex align-items-center justify-content-center text-center btn rounded-0 w-100 h-100">
                  <PlusIcon style={{ width: '2rem' }} color={"gray"} />
                </div>
              </Col>
            </Row>
            <button type="submit" className="d-none" ref={submitButtonRef}>Submit</button>
          </Form>
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-black rounded-0 px-3" onClick={submitClickHandler}>Share</button>
        <button className="btn btn-black btn-black--invert rounded-0 px-3" onClick={cancelHandler}>Cancel</button>
      </Modal.Footer>
    </>
  );
};

export default CreateForm;