import React from 'react';
import Placeholder from './Placeholder/Placeholder';

import './MixAndMatchCanvas.scss';

const MixAndMatchCanvas = ({ className, top, bottom, ...props }) => {
  let classes = 'mix-and-match-canvas border h-100 p-5 d-flex flex-row flex-lg-column justify-content-center align-items-center';

  if (className) {
    classes += ' ' + className;
  }

  const topContent = top
    ? <img className="w-100 h-100" src={top.image} alt="mix_and_match_outfit" />
    : <Placeholder type="top" />
  const bottomContent = bottom
    ? <img className="w-100 h-100" src={bottom.image} alt="mix_and_match_outfit" />
    : <Placeholder type="bottom" />

  return (
    <div className={classes}>
      <div className="item mb-0 mb-lg-3 me-3 me-lg-0">
        {topContent}
      </div>
      <div className="item">
        {bottomContent}
      </div>
    </div>
  );
};

export default MixAndMatchCanvas;