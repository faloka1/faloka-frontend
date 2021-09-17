import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import HomeSection from '../components/HomeSection/HomeSection';
import PopularCategoryCard from '../components/PopularCategoryCard/PopularCategoryCard';
import ProductCard from '../components/ProductCard/ProductCard';

const DUMMY_PRODUCT = {
  name: 'Baju besar bagus bersahaja',
  location: 'Surabaya',
  brandName: 'Toko Jaya Utama Mantap Jiwa',
  price: 98000,
  discount: 0.5,
};

const Home = () => {
  return (
    <>
      <BannerCarousel className="mb-5" />
      <Container>
        <HomeSection title="Kategori Populer">
          <Row>
            <Col lg={4} className="mb-4">
              <PopularCategoryCard categoryName="Kemeja" backgroundImage="assets/images/popular-categories/popular-category-1.png" />
            </Col>
            <Col lg={4} className="mb-4">
              <PopularCategoryCard categoryName="Blouse" backgroundImage="assets/images/popular-categories/popular-category-2.png" />
            </Col>
            <Col lg={4} className="mb-4">
              <PopularCategoryCard categoryName="Sweater" backgroundImage="assets/images/popular-categories/popular-category-3.png" />
            </Col>
          </Row>
        </HomeSection>
        <HomeSection title="Style Guide">
          <Row>
            <Col lg={6} className="mb-4">
              <div style={{
                position: 'relative',
                backgroundColor: 'green',
                minHeight: '300px',
              }} className="h-100">
                <Link to='#' style={{
                  position: 'absolute',
                  top: '60%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '2rem',
                  backgroundColor: 'white',
                  padding: '.5rem 1.5rem'
                }}>Shop Now</Link>
              </div>
            </Col>
            <Col lg={6} className="mb-4">
              <Row>
                <Col lg={6} className="mb-4">
                  <ProductCard product={DUMMY_PRODUCT} />
                </Col>
                <Col lg={6} className="mb-4">
                  <ProductCard product={DUMMY_PRODUCT} />
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <ProductCard product={DUMMY_PRODUCT} />
                </Col>
                <Col lg={6}>
                  <ProductCard product={DUMMY_PRODUCT} />
                </Col>
              </Row>
            </Col>
          </Row>
        </HomeSection>
      </Container>
    </>
  );
};

export default Home;