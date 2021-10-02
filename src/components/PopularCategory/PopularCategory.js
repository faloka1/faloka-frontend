import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import HomeSection from '../HomeSection/HomeSection';
import PopularCategoryCard from './PopularCategoryCard/PopularCategoryCard';
import axios from 'axios';

const PopularCategory = ({ category }) => {
  const popularSubCategoriesQuery = useQuery(
    ['popular-sub-categories', { category }],
    async ({ queryKey }) => {
      const [, { category }] = queryKey;

      try {
        const response = await axios.get(`http://192.168.100.7:8000/api/home/populer/${category}`);

        return response.data.sub_categories;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: !!category
    }
  );

  const content = popularSubCategoriesQuery.isLoading
    ? (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" className="mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
    : (
      <Row xs={1} md={3} className="g-4">
        {popularSubCategoriesQuery.data.map(sub_category => (
          <Col key={sub_category.slug}>
            <PopularCategoryCard categoryName={sub_category.name} backgroundImage="assets/images/popular-categories/popular-category-1.png" />
          </Col>
        ))}
      </Row>
    );

  return (!!category &&
    <>
      <HomeSection title="Kategori Populer">
        {content}
      </HomeSection>
    </>
  );
};

export default PopularCategory;