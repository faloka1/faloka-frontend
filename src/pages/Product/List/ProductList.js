import React, { useState } from 'react';
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useLocation } from 'react-router-dom';

import ProductCard from '../../../components/ProductCard/ProductCard';
import getProducts from "../../../helpers/api/get-products";
import ProductCardPlaceholder from '../../../components/ProductCard/Placeholder/Placeholder';

import '../../../components/ProductCard/ProductCard.scss';

const ProductList = () => {
  const [count, setCount] = useState(0);
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);

  let query = new URLSearchParams(useLocation().search);
  var categorySlug = query.get("categories");
  var subcategory = query.get("subcategories");
  const { isLoading } = useQuery(
    ['product-list', { categorySlug, subcategory }],
    async ({ queryKey }) => {
      const [, { categorySlug, subcategory }] = queryKey;
      try {
        const response = await getProducts(categorySlug, subcategory);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (data) => {
        setCount(data.count);
        setCategory(data.category[0].name);
        setProducts(data.product);
      }
    }
  );
  const content = isLoading ? (
    <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
      {[1, 2, 3, 4].map(view => (
        <Col key={view}>
          <ProductCardPlaceholder />
        </Col>
      ))}
    </Row>
  ) : (
    <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
      {products.map(product => (
        <Col key={product.slug}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      <Breadcrumb className="pt-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>Blouse</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }} active>Jumpsuit Elegan</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="text-center">{category}</h3>
      <p className="text-muted text-center">({count} produk ditemukan)</p>
      {content}
    </Container>
  );
};

export default ProductList;