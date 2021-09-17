import React from 'react';
import { Link } from 'react-router-dom';

import './PopularCategoryCard.scss';

const PopularCategoryCard = ({ categoryName, backgroundImage }) => {
  return (
    <Link to="#">
      <div className="popular-category-card" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <p>{categoryName}</p>
      </div>
    </Link>
  );
};

export default PopularCategoryCard;