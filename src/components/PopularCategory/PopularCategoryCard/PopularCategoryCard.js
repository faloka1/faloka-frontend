import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './PopularCategoryCard.scss';

const PopularCategoryCard = ({ data }) => {
  return (
    <Link to={{
      pathname: '/products',
      search: `?categories=${data.category_slug}&subcategories=${data.slug}`
    }}>
      <Card className="popular-category-card">
        <Card.Img src={data.image_url} className="w-100" alt="Card image" />
        <Card.ImgOverlay>
          <Card.Text>{data.name}</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Link>
  );
};

export default PopularCategoryCard;