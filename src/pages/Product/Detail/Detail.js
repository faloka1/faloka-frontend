import React from 'react';
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
        <Breadcrumb className="pt-5">
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Blouse</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Jumpsuit Elegan</Breadcrumb.Item>
          <Breadcrumb.Item active>Detail</Breadcrumb.Item>
        </Breadcrumb>
        <ProductDetail product={DummyData} />
        <div className="product-tab">
          <Tabs defaultActiveKey="description" id="product-tab">
            <Tab eventKey="description" title="Deskripsi">
              <ScrollableContainer product={DummyData} />
            </Tab>
            <Tab eventKey="size-detail" title="Detail Ukuran">
            </Tab>
          </Tabs>
        </div>
        <ItemContainer title="Mungkin Kamu Suka">
          <Row xs={1} lg={2} xl={4} className="g-4">
            <Col>
              <ProductCard product={DummyData} />
            </Col>
            <Col>
              <ProductCard product={DummyData} />
            </Col>
            <Col>
              <ProductCard product={DummyData} />
            </Col>
            <Col>
              <ProductCard product={DummyData} />
            </Col>
          </Row>
        </ItemContainer>
      </Container>
    </>
  );
};

export default Detail;