import React, { useState } from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';

import HomeSection from '../HomeSection/HomeSection';
import PopularCategoryCard from './PopularCategoryCard/PopularCategoryCard';
import getPopularCategory from '../../helpers/api/get-popular-category';
import { BASE_CONTENT_URL } from '../../config/api';

import CeweHoodie from '../../assets/images/popular_category/cewe/hoodie.png';
import CeweKardingan from '../../assets/images/popular_category/cewe/kardingan.png';
import CeweKaos from '../../assets/images/popular_category/cewe/kaos.png';

import CowoHoodie from '../../assets/images/popular_category/cowo/hoodie.png';
import CowoKaos from '../../assets/images/popular_category/cowo/kaos.png';
import CowoKemeja from '../../assets/images/popular_category/cowo/kemeja.png';

const PopularCategory = ({ category }) => {
  const cewekImage = '[{"name":"Kaos","slug":"kaos","image_url":"' + CeweKaos + '"},' +
                    '{"name":"Kardigan","slug":"kardigan","image_url":"' + CeweKardingan + '"},' +
                    '{"name":"Hoodie","slug":"hoodie","image_url":"' + CeweHoodie + '"}]';

  const cowokImage = '[{"name":"Kaos","slug":"kaos","image_url":"' + CowoKaos + '"},' +
                    '{"name":"Kemeja","slug":"kemeja","image_url":"' + CowoKemeja + '"},' +
                    '{"name":"Hoodie","slug":"hoodie","image_url":"' + CowoHoodie + '"}]';

  const [popularCategories, setPopularCategories] = useState([]);

  const { data, isLoading, isSuccess } = useQuery(
    ['popular-sub-categories', { category }],
    async ({ queryKey }) => {
      const [, { category }] = queryKey;

      try {
        const response = await getPopularCategory(category);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: !!category,
      onSuccess: (data) => {
        if (category == 'cewek'){
          setPopularCategories(JSON.parse(cewekImage))
        }else if (category == 'cowok'){
          setPopularCategories(JSON.parse(cowokImage))
        }else{
          setPopularCategories(data.map(ct => ({
            ...ct,
            image_url: `${BASE_CONTENT_URL}${ct.image_url}`,
            category_slug: category,
          })))
        } 
      }
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
            {popularCategories.map(ct => (
              <Col key={ct.slug}>
                <PopularCategoryCard data={ct} />
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