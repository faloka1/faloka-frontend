import React from 'react';

import './HomeSection.scss';

const HomeSection = ({ title, children }) => {
  return (
    <section className="home-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default HomeSection;