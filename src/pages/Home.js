import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import ProductCard from '../components/ProductCard/ProductCard';

import { HomeContext } from '../context/HomeContext/HomeContext';
import PopularCategory from '../components/PopularCategory/PopularCategory';

const Home = () => {
  const { category, homeData } = useContext(HomeContext);
  const filteredCategories = homeData.find(ctgr => ctgr.slug === category);

  return (
    <>
      <BannerCarousel carousels={filteredCategories.carousels} />
      <Container>
        <PopularCategory category={category} />
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="fw-bold mb-0 fs-4">Model Busana Terbaik</p>
          <Link to={`/products?categories=${category}`} className="btn btn-black rounded-0 py-2 px-4">Belanja Sekarang</Link>
        </div>
        <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
          {filteredCategories.products.map(product => (
            <Col xs={12} sm={6} key={product.slug}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Home;