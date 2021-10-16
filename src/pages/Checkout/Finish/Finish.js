import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router';

import FinishedPaymentCard from '../../../components/FinishedPaymentCard/FinishedPaymentCard';
import { CheckoutContext } from '../../../context/CheckoutContext/CheckoutContext';

const Finish = () => {
  const { isConfirmed } = useContext(CheckoutContext);
  const history = useHistory();

  if (!isConfirmed) {
    history.replace('/');
  }

  return (
    <Container className="mt-5">
      <FinishedPaymentCard className="mx-auto col-12 col-md-8 col-lg-6" />
    </Container>
  );
};

export default Finish;