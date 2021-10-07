import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import HomeSection from '../HomeSection/HomeSection';
import PopularCategoryCard from './PopularCategoryCard/PopularCategoryCard';
import getPopularCategory from '../../helpers/api/get-popular-category';

const PopularCategory = ({ category }) => {
  const { data, isLoading, isSuccess } = useQuery(
    ['popular-sub-categories', { category }],
    async ({ queryKey }) => {
      const [, { category }] = queryKey;

      try {
        const response = await getPopularCategory(category);

        return response.data.sub_categories;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: !!category
    }
  );

  const content = isLoading
    ? (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" className="mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
    : isSuccess && data.length > 0
      ? (
        <HomeSection title="Kategori Populer">
          <Row xs={1} md={3} className="g-4">
            {data.map(sub_category => (
              <Col key={sub_category.slug}>
                <PopularCategoryCard categoryName={sub_category.name} backgroundImage="assets/images/popular-categories/popular-category-1.png" />
              </Col>
            ))}
          </Row>
        </HomeSection>
      ) : null;

  return (
    <>
      {content}
    </>
  );
};

export default PopularCategory;