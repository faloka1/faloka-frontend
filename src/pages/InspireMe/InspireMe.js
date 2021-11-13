import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import InspireMePost from '../../components/InspireMePost/InspireMePost';

const InspireMe = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col xs={6} lg={3}>
          <InspireMePost photo={1} />
        </Col>
        <Col xs={6} lg={3}>
          <InspireMePost photo={2} />
        </Col>
        <Col xs={6} lg={3}>
          <InspireMePost photo={3} />
        </Col>
        <Col xs={6} lg={3}>
          <InspireMePost />
        </Col>
        <Col xs={6} lg={3}>
          <InspireMePost />
        </Col>
        <Col xs={6} lg={3}>
          <InspireMePost />
        </Col>
      </Row>
    </Container>
  );
};

export default InspireMe;