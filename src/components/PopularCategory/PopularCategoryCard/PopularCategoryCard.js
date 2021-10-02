import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './PopularCategoryCard.scss';

const PopularCategoryCard = ({ categoryName, backgroundImage }) => {
  return (
    <Link to="/products">
      <Card className="popular-category-card">
        <Card.Img src={backgroundImage} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Text>{categoryName}</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </Link>
  );
};

export default PopularCategoryCard;