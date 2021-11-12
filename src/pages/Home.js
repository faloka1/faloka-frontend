import React, { useContext } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import BannerCarousel from '../components/BannerCarousel/BannerCarousel'
import BannerSide from '../components/BannerSide/BannerSide'
import HomeSection from '../components/HomeSection/HomeSection';
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
        <HomeSection title="Style Guide">
          <Row className="g-4">
            <Col lg={6} className="mb-4">
              <BannerSide backgroundImage="assets/images/side-banners/sidebanner_1.png" />
            </Col>
            <Col lg={6} className="mb-4">
              <Row className="g-4">
                {filteredCategories.products.map(product => (
                  <Col xs={12} sm={6} key={product.slug}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </HomeSection>
      </Container>
    </>
  );
};

export default Home;