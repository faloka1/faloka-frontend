import React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';

import './MixAndMatchMenu.scss';

import Item from './Item/Item';

const MixAndMatchMenu = () => {
  return (
    <div className="mix-and-match-menu border custom-tab">
      <Tabs defaultActiveKey="atasan">
        <Tab eventKey="atasan" title="Atasan">
          <Row className="g-4">
            {[...Array(7)].map((x, i) =>
              <>
                <Col xs={4} key={x}>
                  <Item image="./assets/images/products/product_3.png" path="#" />
                </Col>
              </>
            )}
          </Row>
        </Tab>
        <Tab eventKey="bawahan" title="Bawahan">
          <Row className="g-4">
            {[...Array(14)].map((x, i) =>
              <Col xs={4} key={x}>
                <Item image="./assets/images/products/product_4.png" path="#" />
              </Col>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MixAndMatchMenu;