import React from 'react';

import './CounterBadge.scss';

const CounterBadge = ({ count }) => {
  return (
    <span className="counter-badge">{count}</span>
  );
};

export default CounterBadge;