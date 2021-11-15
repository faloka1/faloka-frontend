import React, { useRef, useState } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';

import './InspireMeForm.scss';

import { ReactComponent as PlusIcon } from '../../SVG/plus.svg';
import { useMutation } from 'react-query';
import postInspireMe from '../../../helpers/api/inspire-me/post-inspire-me';

const CreateForm = ({ onClose, onAddProduct, selectedProducts, onPosted, captionField, postedPhoto }) => {
  const [photoError, setPhotoError] = useState(false);
  const photoInputRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [captionIsTouched, setCaptionIsTouched] = useState(false);
  const [captionError, setCaptionError] = useState(false);

  const { mutateAsync, isLoading } = useMutation(async (data) => {
    const response = await postInspireMe(data.caption, data.photo, data.products);

    return response.data;
  });

  const captionChangeHandler = (event) => {
    setCaptionIsTouched(true);
    setCaptionError(false);
    captionField.set(event.target.value);
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

    postedPhoto.set({ url: photo, file });
  };

  const submitClickHandler = () => {
    submitButtonRef.current.click();
    if (!!!postedPhoto.value) {
      setPhotoError(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (captionField.value.trim().length === 0) {
      setCaptionError(true);
      return;
    }

    if (!!!postedPhoto.value) {
      return;
    }

    try {
      const response = await mutateAsync({ caption: captionField.value, photo: postedPhoto.value.file, products: [...selectedProducts] });

      onPosted({
        id: response.inspiremeid,
        caption: captionField.value,
        photo: postedPhoto.value.url,
        products: selectedProducts.map(sp => ({
          slug: sp.slug,
          image: sp.image,
          price: sp.price
        }))
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Body>
        <p className="fs-4 text-center">Share Gaya Outfitmu</p>
        <div className="d-flex justify-content-center cursor-pointer mb-2" >
          {!!!postedPhoto.value &&
            <div className="border d-inline-block text-center py-3 px-5 btn rounded-0" onClick={addPhotoClickHandler}>
              <PlusIcon style={{ width: '3rem' }} color={"gray"} />
            </div>
          }
          {!!postedPhoto.value &&
            <img src={postedPhoto.value.url} alt='outfit' className="w-50" />
          }
        </div>
        {photoError &&
          <p className="text-danger text-center">Belum upload foto.</p>
        }
        {!!postedPhoto.value &&
          <p className="text-muted text-center btn mx-auto d-block" onClick={addPhotoClickHandler}>Ganti foto</p>
        }
        {!!!postedPhoto.value &&
          <p className="text-muted text-center">Upload Foto Outfitmu</p>
        }
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="caption">Caption</label>
            <textarea className="form-control rounded-0" rows="4" id="caption" onChange={captionChangeHandler} name="caption" placeholder="ex: Outfit ini bakal cocok untuk kalian yang mau dapet foto senja" value={captionField.value}></textarea>
            {((captionField.value.trim().length === 0 && captionIsTouched) || captionError) && <p className="text-danger">Harus diisi</p>}
          </div>
          <input ref={photoInputRef} type="file" name="photo" accept=".jpg,.png,.jpeg" className="d-none" onChange={photoInputChangeHandler} />
          <p>Bagikan informasi produk yang mungkin sesuai dengan outfitmu</p>
          <Row className="inspire-me-form__products">
            {selectedProducts.map(p => (
              <Col key={p.id} xs={4} className="mb-3">
                <img src={p.image} alt="h-auto" className="w-100" />
              </Col>
            ))}
            <Col xs={4} className="mb-3" style={{ height: '100px' }} onClick={addProductHandler}>
              <div className="border d-flex align-items-center justify-content-center text-center btn rounded-0 w-100 h-100">
                <PlusIcon style={{ width: '2rem' }} color={"gray"} />
              </div>
            </Col>
          </Row>
          <button type="submit" className="d-none" ref={submitButtonRef}>Submit</button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className={`btn btn-black rounded-0 px-3 ${isLoading ? 'opacity-50 pe-none' : ''}`} onClick={submitClickHandler}>Share</button>
        <button className="btn btn-black btn-black--invert rounded-0 px-3" onClick={cancelHandler}>Cancel</button>
      </Modal.Footer>
    </>
  );
};

export default CreateForm;