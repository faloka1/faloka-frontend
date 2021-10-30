import React from 'react';
import { Placeholder as BsPlaceholder, Card } from 'react-bootstrap';

const Placeholder = () => {
  return (
    <Card className="product-card">
      <BsPlaceholder className="product-image" animation="glow">
        <BsPlaceholder className="card-img-top" bg="secondary" />
      </BsPlaceholder>
      <Card.Body>
        <BsPlaceholder as={Card.Text} animation="glow">
          <BsPlaceholder xs={8} bg="secondary" />
          <BsPlaceholder xs={6} bg="secondary" />
        </BsPlaceholder>
      </Card.Body>
    </Card>
  );
};

export default Placeholder;