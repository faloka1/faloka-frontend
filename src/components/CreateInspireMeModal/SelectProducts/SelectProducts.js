import React, { useState } from 'react'
import { Modal, Form, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import './SelectProducts.scss'

import { ReactComponent as CancelIcon } from '../../SVG/x.svg';
import CurrencyFormatter from '../../CurrencyFormatter/CurrencyFormatter';
import getUserProducts from '../../../helpers/api/inspire-me/get-user-products';
import { BASE_CONTENT_URL } from '../../../config/api';

const SelectProducts = ({ onDone, onCancel, selectedProducts }) => {
  const [products, setProducts] = useState([]);
  const [isProcessing, setIsProcessing] = useState(true);

  const { isLoading: isFetching } = useQuery('user-products', async () => {
    const response = await getUserProducts();

    return response.data;
  }, {
    onSuccess: (data) => {
      console.log(data);
      const fetchedProducts = data.reduce((p, item) => {
        const matchedProduct = p.find(i => i.variant_id === item.variant_id && i.product_id === item.product_id);

        if (!!matchedProduct) {
          return [...p];
        }

        return [
          ...p,
          {
            id: `${item.product_id}-${item.variant_id}`,
            product_id: item.product_id,
            variant_id: item.variant_id,
            name: item.products.name,
            price: item.products.price,
            slug: item.products.slug,
            image: `${BASE_CONTENT_URL}${item.variants.variants_image[0].image_url}`,
            checked: !!selectedProducts.find(p => p.id === `${item.product_id}-${item.variant_id}`)
          }
        ];
      }, []);

      setProducts(fetchedProducts);
      setIsProcessing(false);
    },
    onError: (error) => console.log(error)
  });

  const cancelHandler = () => {
    onCancel();
  };

  const doneHandler = () => {
    onDone(products.filter(p => p.checked));
  };

  const checkChangeHandler = (event) => {
    const checked = event.target.checked;
    const checkedId = event.target.value;

    setProducts(prev => prev.map(p => {
      if (p.id === checkedId) {
        return {
          ...p,
          checked
        }
      }

      return p;
    }));
  }

  return (
    <>
      <Modal.Header className="d-flex align-items-center justify-content-between">
        <div className="btn" onClick={cancelHandler}>
          <CancelIcon />
        </div>
        <p className="mb-0 fs-5">Order</p>
        <div onClick={doneHandler} className="btn select-products__done fw-bold">Done</div>
      </Modal.Header>
      <Modal.Body>
        {(isFetching || isProcessing) && (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {(!isFetching || !isProcessing) &&
          products.map(p => (
            <Form.Check key={p.id} className="border d-flex align-items-center mb-2">
              <Form.Check.Label className="d-flex flex-grow-1">
                <img src={p.image} className="select-products__image me-3" alt="" />
                <div className="d-flex flex-column justify-content-center">
                  <p className="text-muted">{p.name}</p>
                  <CurrencyFormatter value={p.price} renderText={(value) => <p className="fs-4">{value}</p>} />
                </div>
              </Form.Check.Label>
              <Form.Check.Input type="checkbox" className="me-3" checked={p.checked} value={p.id} onChange={checkChangeHandler} />
            </Form.Check>
          ))}
      </Modal.Body>
    </>
  );
};

export default SelectProducts;