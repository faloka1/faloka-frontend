import React from 'react';

import { ReactComponent as TopOutfitIcon } from '../../SVG/top-outfit.svg';
import { ReactComponent as BottomOutfitIcon } from '../../SVG/bottom-outfit.svg';

const Placeholder = ({ type, className, ...props }) => {
  let classes = 'placeholder p-3 d-flex flex-column justify-content-center w-100';

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes} {...props}>
      {type === 'top' &&
        <div className="d-flex justify-content-center">
          <TopOutfitIcon className="text-center d-block" />
        </div>
      }
      {type === 'bottom' &&
        <div className="d-flex justify-content-center">
          <BottomOutfitIcon className="text-center d-block" />
        </div>
      }
      <p className="text-center">Klik outfit {type === 'top' ? 'atasan' : 'bawahan'} yang ingin kamu pilih</p>
    </div>
  )
}

export default Placeholder
