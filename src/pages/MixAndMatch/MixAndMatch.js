import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import MixAndMatchCanvas from '../../components/MixAndMatchCanvas/MixAndMatchCanvas';
import MixAndMatchMenu from '../../components/MixAndMatchMenu/MixAndMatchMenu';

const MixAndMatch = () => {
  const [top, setTop] = useState(null);
  const [bottom, setBottom] = useState(null);

  return (
    <Container className="mt-5">
      <h2 className="text-center h4 my-4">Buat Mix and Matchmu</h2>
      <Row className="g-4">
        <Col xs={12} lg={7}>
          <MixAndMatchCanvas top={top} bottom={bottom} />
        </Col>
        <Col xs={12} lg={5}>
          <MixAndMatchMenu onSetTop={setTop} onSetBottom={setBottom} />
        </Col>
      </Row>
    </Container >
  );
};

export default MixAndMatch;