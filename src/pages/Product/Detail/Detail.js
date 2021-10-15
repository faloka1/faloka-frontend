import React, { useState } from 'react';
import {
  Col,
  Container,
  Row,
  Breadcrumb,
  Tabs,
  Tab,
  Spinner
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Detail.scss';

import ItemContainer from '../../../components/ItemContainer/ItemContainer';
import ScrollableContainer from '../../../components/ScrollableContainer/ScrollableContainer';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductDetail from '../../../components/ProductDetail/ProductDetail';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import getProductDetail from '../../../helpers/api/get-product-detail';
import getRelatedProducts from '../../../helpers/api/get-related-products';
import ProductNotFound from '../../Error/ProductNotFound';

const Detail = () => {
  const [foundProduct, setFoundProduct] = useState(true);
  const { productSlug } = useParams();
  const { data: product, ...productDetailQuery } = useQuery(
    ['product-detail', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;

      try {
        const response = await getProductDetail(productSlug);

        return response.data;
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setFoundProduct(false);
        }
      }
    }
  );
  const { data: relatedProducts, ...relatedProductQuery } = useQuery(
    ['related-products', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;

      try {
        const response = await getRelatedProducts(productSlug);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: productDetailQuery.isSuccess
    }
  );

  if (!foundProduct) {
    return (
      <ProductNotFound />
    );
  }

  return (!productDetailQuery.isLoading && !productDetailQuery.isError &&
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
          {relatedProductQuery.isLoading &&
            <div className="d-flex justify-content-center my-3">
              <Spinner />
            </div>
          }
          {relatedProductQuery.isSuccess &&
            <Row md={2} lg={4} xl={4} className="g-4">
              {relatedProducts.map(rp => (
                <Col key={rp.slug}>
                  <ProductCard product={rp} />
                </Col>
              ))}
            </Row>
          }
        </ItemContainer>
      </Container>
    </>
  );
};

export default Detail;