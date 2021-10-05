import React from 'react';
import { Col, Container, Row, Breadcrumb, Tabs, Tab } from 'react-bootstrap';

import './Detail.scss';

import ItemContainer from '../../../components/ItemContainer/ItemContainer';
import ScrollableContainer from '../../../components/ScrollableContainer/ScrollableContainer';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductDetail from '../../../components/ProductDetail/ProductDetail';
import DummyData from '../../../components/DummyData/DummyData';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import getProductDetail from '../../../helpers/api/get-product-detail';
import { Link } from 'react-router-dom';

const Detail = () => {
  const { productSlug } = useParams();
  const { data: product, isLoading, isError } = useQuery(
    ['popular-sub-categories', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;

      try {
        const response = await getProductDetail(productSlug);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );


  return (!isLoading && !isError &&
    <>
      <Container>
        <Breadcrumb className="pt-5">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products", search: `${product.sub_categories.name}` }}>{product.sub_categories.name}</Breadcrumb.Item>
          <Breadcrumb.Item href="#" active>{product.name}</Breadcrumb.Item>
        </Breadcrumb>
        <ProductDetail product={product} />
        <div className="product-tab">
          <Tabs defaultActiveKey="description" id="product-tab">
            <Tab eventKey="description" title="Deskripsi">
              <ScrollableContainer product={product} />
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