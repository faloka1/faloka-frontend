import React from 'react';
import './ScrollableContainer.scss';

const ScrollableContainer = ({ product }) => {
  const {
    description,
  } = product;
  return (
    <div className="scrollable p-3"
      dangerouslySetInnerHTML={{
        __html: description
      }}>
    </div>
  );
};

export default ScrollableContainer;