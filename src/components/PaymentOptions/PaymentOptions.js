import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';

import './PaymentOptions.scss';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';

const PaymentOptions = ({ className }) => {
  const { setPaymentMethod } = useContext(CheckoutContext);

  return (
    <Card className={`p-3${className ? ' ' + className : ''}`}>
      <Card.Title><strong>Metode Pembayaran</strong></Card.Title>
      <p>Mohon maaf, Sementara ini pembayaran hanya bisa dilakukan melalui transfer bank atau e-money </p>

      <Formik
        initialValues={{
          paymentMethod: '',
        }}
      >
        {({ values }) => {
          return (
            <Form>
              <p id="my-radio-group" className="text-gray">Pilih tujuan transafer:</p>
              <Row role="group" aria-labelledby="my-radio-group" onChange={() => setPaymentMethod(values.paymentMethod)}>
                {[...Array(6)].map((x, i) =>
                  <Col key={i} sm={6}>
                    <label key={i} className="d-flex mb-3">
                      <Field type="radio" name="paymentMethod" value={`${i}`} />
                      <div className="payment-method-item">
                        <p className="mb-0">BANK BCA <span className="payment-method-item__more-detail"><small><strong>Lihat rincian</strong></small></span></p>
                        <div className="payment-method-item__detail p-3">
                          <p className="mb-2">No. Rekening: 103910932</p>
                          <p className="mb-0">Atas nama: Rahayu Jiahahay hayu</p>
                        </div>
                      </div>
                    </label>
                  </Col>
                )}
              </Row>
            </Form>
          )
        }}

      </Formik>
    </Card>
  )
}

export default PaymentOptions
