import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import BannerSide from '../components/BannerSide/BannerSide'
import HomeSection from '../components/HomeSection/HomeSection';
import PopularCategoryCard from '../components/PopularCategoryCard/PopularCategoryCard';
import ProductCard from '../components/ProductCard/ProductCard';

import DummyData from '../components/DummyData/DummyData';

const Home = () => {
  return (
    <>
      <BannerCarousel />
      <Container>
        <HomeSection title="Kategori Populer">
          <Row sm={1} md={3} className="g-4">
            <Col>
              <PopularCategoryCard categoryName="Kemeja" backgroundImage="assets/images/popular-categories/popular-category-1.png" />
            </Col>
            <Col>
              <PopularCategoryCard categoryName="Blouse" backgroundImage="assets/images/popular-categories/popular-category-2.png" />
            </Col>
            <Col>
              <PopularCategoryCard categoryName="Sweater" backgroundImage="assets/images/popular-categories/popular-category-3.png" />
            </Col>
          </Row>
        </HomeSection>
        <HomeSection title="Style Guide">
          <Row md={1} lg={2} className="g-4">
            <Col lg={6} className="mb-4">
              <BannerSide backgroundImage="assets/images/side-banners/sidebanner_1.png" />
            </Col>
            <Col lg={6} className="mb-4">
              <Row md={1} lg={2} className="g-4">
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
            </Col>
          </Row>
        </HomeSection>
      </Container>
    </>
  );
};

export default Home;