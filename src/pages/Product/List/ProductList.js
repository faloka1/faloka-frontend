import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Breadcrumb, Placeholder, Card } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';

import ProductCard from '../../../components/ProductCard/ProductCard';
import getProducts from "../../../helpers/api/get-products";

import '../../../components/ProductCard/ProductCard.scss';

const ProductList = () => {
  let query = new URLSearchParams(useLocation().search);
  var category = query.get("categories");
  var subcategory = query.get("subcategories");
  const productsQuery = useQuery(
    ['product-list', { category, subcategory }],
    async ({ queryKey }) => {
      const [, { category, subcategory }] = queryKey;
      try {
        const response = await getProducts(category, subcategory);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    }
  );
  const content = productsQuery.isLoading ? (
      <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
        {[1,2,3,4].map(view => (
          <Col key={view}>
            <Card className="product-card">
              <Placeholder className="product-image" animation="glow">
                <Placeholder className="card-img-top" bg="secondary"/>
              </Placeholder>
              <Card.Body>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={8} bg="secondary"/>
                  <Placeholder xs={6} bg="secondary"/>
                </Placeholder>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    ) : (
      <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
        {productsQuery.data.map(product => (
          <Col key={product.slug}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    );
  
  return (
    <>
      <Container>
        <Breadcrumb className="pt-5">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>Blouse</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }} active>Jumpsuit Elegan</Breadcrumb.Item>
        </Breadcrumb>
        <h3 className="text-center">Atasan</h3>
        <p className="text-muted text-center">({productsQuery.isSuccess ? (productsQuery.data.length) : (0)} produk ditemukan)</p>
        {content}
      </Container>
    </>
  );
};

export default ProductList;