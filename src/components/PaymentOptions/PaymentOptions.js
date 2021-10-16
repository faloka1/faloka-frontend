import React, { useContext, useEffect, useState } from 'react';
import { Card, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Form } from 'react-bootstrap';

import './PaymentOptions.scss';

import { CheckoutContext } from '../../context/CheckoutContext/CheckoutContext';
import getPaymentMethods from '../../helpers/api/get-payment-methods';

const PaymentOptions = ({ className }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const { setPaymentMethod } = useContext(CheckoutContext);
  useQuery('get-payment-methods', async () => {
    const response = await getPaymentMethods();

    return response.data;
  }, {
    onSuccess: (data) => setPaymentMethods(data),
    onError: (err) => console.log(err),
  });

  const onSelectPaymentHandler = (event) => {
    setSelectedPayment(event.target.value);
  };

  useEffect(() => {
    if (selectedPayment !== '') {
      const payment = paymentMethods.find(pm => +selectedPayment === pm.id);
      setPaymentMethod(payment);
    }
  }, [selectedPayment, paymentMethods, setPaymentMethod]);

  return (
    <Card className={`p-3${className ? ' ' + className : ''}`}>
      <Card.Title><strong>Metode Pembayaran</strong></Card.Title>
      <p>Mohon maaf, Sementara ini pembayaran hanya bisa dilakukan melalui transfer bank atau e-money</p>

      <Row className="">
        {paymentMethods.map(pm => (
          <Form.Check className="col-sm-6 mb-4">
            <Form.Check.Label className="d-flex">
              <Form.Check.Input name="paymentMethod" type='radio' value={`${pm.id}`} onChange={onSelectPaymentHandler} />
              <div className="payment-method-item">
                <p className="mb-0">{pm.payment_name}</p>
                <div className="payment-method-item__detail p-3">
                  <p className="mb-2">No. Rekening: {pm.no_rekening}</p>
                  <p className="mb-0">Atas nama: {pm.account_name}</p>
                </div>
              </div>
            </Form.Check.Label>
          </Form.Check>
        ))}
      </Row>
    </Card>
  )
}

export default PaymentOptions
