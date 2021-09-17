import React from 'react';

import './HomeSection.scss';

const HomeSection = ({ title, children }) => {
  return (
    <section className="home-section my-5 py-5">
      <h2 className="mb-5 text-center">{title}</h2>
      {children}
    </section>
  );
};

export default HomeSection;