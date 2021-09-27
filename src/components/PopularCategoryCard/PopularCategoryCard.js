import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import './PopularCategoryCard.scss';

const PopularCategoryCard = ({ categoryName, backgroundImage }) => {
  return (
    <Card className="popular-category-card">
      <Link to="/products">
        <Card.Img src={backgroundImage} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Text>{categoryName}</Card.Text>
        </Card.ImgOverlay>
      </Link>
    </Card>
  );
};

export default PopularCategoryCard;