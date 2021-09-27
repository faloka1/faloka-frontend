import React from 'react';

import './ItemContainer.scss';

const ItemContainer = ({ title, children }) => {
  return (
    <div className={`product-recommend`}>
      <h5>{title}</h5>
      {children}
    </div>
  );
};

export default ItemContainer;