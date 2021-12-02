import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useLocation, useHistory } from 'react-router-dom';

import getProducts from "../../../helpers/api/get-products";
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductCardPlaceholder from '../../../components/ProductCard/Placeholder/Placeholder';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

import '../../../components/ProductCard/ProductCard.scss';

const ProductList = () => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [breadcrumbData, setBreadcrumbData] = useState(null);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  let query = new URLSearchParams(useLocation().search);
  var categorySlug = query.get("categories");
  var subcategory = query.get("subcategories");
  const { isLoading } = useQuery(
    ['product-list', { categorySlug, subcategory }],
    async ({ queryKey }) => {
      const [, { categorySlug, subcategory }] = queryKey;
      try {
        const response = await getProducts({ category: categorySlug, sub_category: subcategory });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      onSuccess: (data) => {
        const homeBreadcrumb = { label: 'Home', path: { to: '/' } };
        let otherBreadcrumb = [];
        setCount(data.count);
        setProducts(data.products);

        if (!!data.category && data.sub_category) {
          setTitle(data.sub_category[0].name);
          otherBreadcrumb = [
            {
              label: data.category[0].name,
              path: {
                to: '/products',
                search: `?categories=${data.category[0].name}`
              }
            },
            {
              label: data.sub_category[0].name,
              path: {
                to: '/products',
                search: `?subcategories=${data.sub_category[0].slug}`
              },
              active: true
            }
          ];
        } else if (!!data.category) {
          setTitle(data.category[0].name);
          otherBreadcrumb = [
            {
              label: data.category[0].name,
              path: {
                to: '/products',
                search: `?categories=${data.category[0].name}`
              },
              active: true
            }
          ];
        } else {
          setTitle(data.sub_category[0].name);
          otherBreadcrumb = [
            data.sub_category[0].category.map(ct => ({
              label: ct.name,
              path: {
                to: '/products',
                search: `?categories=${ct.slug}`
              }
            })),
            {
              label: data.sub_category[0].name,
              path: {
                to: '/products',
                search: `?subcategories=${data.sub_category[0].slug}`
              },
              active: true
            }
          ];
        }

        setBreadcrumbData([homeBreadcrumb, ...otherBreadcrumb]);
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

  useEffect(() => {
    if (!!!categorySlug && !!!subcategory) {
      history.replace('/');
    }
  });

  return (
    <Container className={isLoading ? 'placeholder-glow' : ''}>
      {!!breadcrumbData &&
        <Breadcrumb breadcrumbData={breadcrumbData} className="pt-5" />
      }
      <div className="d-flex justify-content-between align-items-center">
        <p className={`fs-3 ${isLoading ? 'col-2 placeholder bg-secondary' : ''}`}>{!isLoading && title}</p>
        <p className="text-muted"><span className="fw-bold text-dark">{count}</span> produk ditemukan</p>
      </div>
      {content}
    </Container>
  );
};

export default ProductList;