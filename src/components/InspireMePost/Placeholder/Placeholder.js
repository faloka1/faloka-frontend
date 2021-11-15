import React from 'react';
import { Placeholder as BootstrapPlaceholder } from 'react-bootstrap';

import '../InspireMePost.scss';

const Placeholder = () => {
  return (
    <div className="inspire-me-post mb-4">
      <BootstrapPlaceholder className="inspire-me-post__photo w-100" />
    </div>
  );
};

export default Placeholder;