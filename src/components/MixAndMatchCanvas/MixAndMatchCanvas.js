import React from 'react';
import Placeholder from './Placeholder/Placeholder';

import './MixAndMatchCanvas.scss';

const MixAndMatchCanvas = ({ className, ...props }) => {
  let classes = 'mix-and-match-canvas border h-100 p-5 d-flex flex-row flex-lg-column justify-content-center align-items-center';

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes}>
      {/* <div className="mb-2" style={{ backgroundColor: 'red', width: '120px', height: '120px' }}></div> */}
      {/* <div className="" style={{ backgroundColor: 'blue', width: '120px', height: '120px' }}></div> */}
      <div className="item mb-0 mb-lg-3 me-3 me-lg-0">
        <Placeholder type="top" />
      </div>
      <div className="item">
        <Placeholder type="bottom" />
      </div>
    </div>
  );
};

export default MixAndMatchCanvas;