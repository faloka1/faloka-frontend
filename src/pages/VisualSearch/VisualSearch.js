import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Redirect, useLocation } from 'react-router';

import './VisualSearch.scss';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ProductCard from '../../components/ProductCard/ProductCard';
import searchByImage from '../../helpers/api/search-by-image';
import ProductCardPlaceholder from '../../components/ProductCard/Placeholder/Placeholder';

const VisualSearch = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const { state: imageFile } = useLocation();

  const { mutate: search, isLoading } = useMutation(async (image) => {
    const response = await searchByImage(image);

    return response.data;
  }, {
    onSuccess: (data) => {
      setProducts(data);
      setCount(data.length);
    },
    onError: (error) => console.log(error)
  });

  useEffect(() => {
    if (!!imageFile) {
      search(imageFile);
    }
  }, [imageFile, search]);

  if (!!!imageFile) {
    return <Redirect path="/" />;
  }

  const searchedImage = URL.createObjectURL(imageFile);

  const breadcrumbData = [
    {
      label: 'Home',
      path: {
        to: '/',
      }
    },
    {
      label: 'Visual Search',
      path: {
        to: '/visual-search',
      },
      active: true
    }
  ];

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
      <Breadcrumb breadcrumbData={breadcrumbData} className="pt-5" />
      <div className="d-flex justify-content-between align-items-center">
        <p className={`search-preview flex-grow-1 fs-3 ${isLoading ? 'col-2' : ''}`}>Hasil pencarian "<img src={searchedImage} alt="search" />"</p>
        <p className="text-muted"><span className="fw-bold text-dark">{count}</span> produk ditemukan</p>
      </div>
      {content}
    </Container>
  );
};

export default VisualSearch;