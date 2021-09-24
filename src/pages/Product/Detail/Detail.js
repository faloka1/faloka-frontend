import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Breadcrumb, Tabs, Tab} from 'react-bootstrap';
import ItemContainer from '../../../components/ItemContainer/ItemContainer';
import ScrollableContainer from '../../../components/ScrollableContainer/ScrollableContainer';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductDetail from '../../../components/ProductDetail/ProductDetail';
import DummyData from '../../../components/DummyData/DummyData';
import './Detail.scss';

const Detail = () => {
  return (
    <>
      <Container>
        <Breadcrumb className="mt-5 mb-3">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Blouse</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Jumpsuit Elegan</Breadcrumb.Item>
          <Breadcrumb.Item active>Detail</Breadcrumb.Item>
        </Breadcrumb>

        <ProductDetail className="mt-4 mb-3" product={DummyData} />

        <Tabs defaultActiveKey="description" id="product-tab" className="mt-5 mb-3 product-tab">
          <Tab eventKey="description" title="Deskripsi">
            <ScrollableContainer product={DummyData} />
          </Tab>
          <Tab eventKey="size-detail" title="Detail Ukuran">
          </Tab>
        </Tabs>
        
        <ItemContainer title="Mungkin Kamu Suka" className="my-5">
          <Row>
            <Col lg={3} className="mb-4">
              <ProductCard product={DummyData} />
            </Col>
            <Col lg={3} className="mb-4">
              <ProductCard product={DummyData} />
            </Col>
            <Col lg={3} className="mb-4">
              <ProductCard product={DummyData} />
            </Col>
            <Col lg={3} className="mb-4">
              <ProductCard product={DummyData} />
            </Col>
          </Row>
        </ItemContainer>
      </Container>
    </>
  );
};

export default Detail;