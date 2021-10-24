import React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';

import './MixAndMatchMenu.scss';

import Item from './Item/Item';

const DUMMY_TOP = {
  image: "./assets/images/products/product_3.png",
  slug: "toppp"
};

const DUMMY_BOTTOM = {
  image: "./assets/images/products/product_4.png",
  slug: "bottommmmm"
};

const MixAndMatchMenu = ({ onSetTop, onSetBottom }) => {
  return (
    <div className="mix-and-match-menu border custom-tab">
      <Tabs defaultActiveKey="atasan">
        <Tab eventKey="atasan" title="Atasan">
          <Row className="g-4">
            {[...Array(7)].map((x, i) =>
              <>
                <Col xs={4} key={x} onClick={() => onSetTop(DUMMY_TOP)}>
                  <Item image="./assets/images/products/product_3.png" path="#" />
                </Col>
                <Col xs={4} key={x} onClick={() => onSetTop({ image: "./assets/images/products/product_5.png", slug: "testtt" })}>
                  <Item image="./assets/images/products/product_5.png" path="#" />
                </Col>
              </>
            )}
          </Row>
        </Tab>
        <Tab eventKey="bawahan" title="Bawahan">
          <Row className="g-4">
            {[...Array(14)].map((x, i) =>
              <>
                <Col xs={4} key={x} onClick={() => onSetBottom(DUMMY_BOTTOM)}>
                  <Item image="./assets/images/products/product_4.png" path="#" />
                </Col>
                <Col xs={4} key={x} onClick={() => onSetBottom({ image: "./assets/images/products/product_6.png", slug: "tesdwwdd" })}>
                  <Item image="./assets/images/products/product_6.png" path="#" />
                </Col>
              </>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MixAndMatchMenu;