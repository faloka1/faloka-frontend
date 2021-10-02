import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import BannerSide from '../components/BannerSide/BannerSide'
import HomeSection from '../components/HomeSection/HomeSection';
import ProductCard from '../components/ProductCard/ProductCard';

import DummyData from '../components/DummyData/DummyData';
import { HomeContext } from '../context/HomeContext/HomeContext';
import PopularCategory from '../components/PopularCategory/PopularCategory';

const Home = () => {
  const { category } = useContext(HomeContext);

  return (
    <>
      <BannerCarousel />
      <Container>
        <PopularCategory category={category} />
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