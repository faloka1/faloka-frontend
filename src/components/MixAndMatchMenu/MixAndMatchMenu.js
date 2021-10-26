import React, { useState } from 'react';
import { Tabs, Tab, Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import './MixAndMatchMenu.scss';

import Item from './Item/Item';
import getMixAndMatchItems from '../../helpers/api/get-mix-and-match-items';
import { BASE_CONTENT_URL } from '../../config/api';

const MixAndMatchMenu = ({ onSetTop, onSetBottom }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('atasan');
  const { isLoading } = useQuery(
    ['mix-and-match-items', { category }],
    async ({ queryKey }) => {
      const [, { category }] = queryKey;

      try {
        const response = await getMixAndMatchItems(category);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (data) => {
        setProducts(data.map(d => ({
          image: `${BASE_CONTENT_URL}${d.mix_and_match_image}`,
          ...d
        })));
      }
    }
  );

  const tabsClickHandler = (key) => {
    setCategory(key);
  };

  return (
    <div className="mix-and-match-menu border custom-tab">
      <Tabs defaultActiveKey={category} onSelect={tabsClickHandler}>
        <Tab eventKey="atasan" title="Atasan">
          <Row className="g-4">
            {!isLoading && products.map(p =>
              <Col xs={4} key={p.slug} onClick={() => onSetTop(p)}>
                <Item image={p.image} path={`/products/${p.slug}`} />
              </Col>
            )}
            {isLoading && (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" className="mx-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </Row>
        </Tab>
        <Tab eventKey="bawahan" title="Bawahan">
          <Row className="g-4">
            {!isLoading && products.map(p =>
              <Col xs={4} key={p.slug} onClick={() => onSetBottom(p)}>
                <Item image={p.image} path={`/products/${p.slug}`} />
              </Col>
            )}
            {isLoading && (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" className="mx-auto">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
          </Row>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MixAndMatchMenu;