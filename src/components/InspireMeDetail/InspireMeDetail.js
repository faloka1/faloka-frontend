import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap';
import CurrencyFormatter from '../CurrencyFormatter/CurrencyFormatter';

import './InspireMeDetail.scss';

const InspireMeDetail = ({ show, onClose, detail }) => {
  return (
    <Modal dialogClassName="inspire-me-detail mx-auto" show={show} onHide={onClose} centered>
      <Modal.Body>
        <Row>
          <Col xs={6}>
            <img className="inspire-me-detail__image w-100" src="./assets/images/products/product_1.png" alt="" />
          </Col>
          <Col xs={6}>
            <div className="d-flex align-items-center mb-4">
              <img className="inspire-me-detail__pp rounded-circle me-2" src="./assets/images/products/product_1.png" alt="" />
              <p className="mb-0 fs-5">Lila 67</p>
            </div>
            <p className="fs-3">Outfit Keren Bercahaya Menyilaukan</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, maiores.</p>
            <p>Relate Product</p>
            <div className="d-flex overflow-auto">
              <div className="inspire-me-detail__product">
                <img className="me-2" src="./assets/images/products/product_1.png" alt="" />
                <CurrencyFormatter value={30000} renderText={(value) => <p className="text-center mb-0">{value}</p>} />
              </div>
              <div className="inspire-me-detail__product">
                <img className="me-2" src="./assets/images/products/product_1.png" alt="" />
                <CurrencyFormatter value={30000} renderText={(value) => <p className="text-center mb-0">{value}</p>} />
              </div>
              <div className="inspire-me-detail__product">
                <img className="me-2" src="./assets/images/products/product_1.png" alt="" />
                <CurrencyFormatter value={30000} renderText={(value) => <p className="text-center mb-0">{value}</p>} />
              </div>
              <div className="inspire-me-detail__product">
                <img className="me-2" src="./assets/images/products/product_1.png" alt="" />
                <CurrencyFormatter value={30000} renderText={(value) => <p className="text-center mb-0">{value}</p>} />
              </div>
              <div className="inspire-me-detail__product">
                <img className="me-2" src="./assets/images/products/product_1.png" alt="" />
                <CurrencyFormatter value={30000} renderText={(value) => <p className="text-center mb-0">{value}</p>} />
              </div>
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default InspireMeDetail
