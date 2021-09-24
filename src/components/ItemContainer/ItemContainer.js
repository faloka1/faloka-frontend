import React from 'react';

import './ItemContainer.scss';

const ItemContainer = ({ title, className, children }) => {
  return (
    <section className={`item ${className}`}>
      <h5 className="mb-4">{title}</h5>
      {children}
    </section>
  );
};

export default ItemContainer;