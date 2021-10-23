import React from 'react'

const Placeholder = ({ type, className, ...props }) => {
  let classes = 'placeholder p-3 d-flex flex-column justify-content-center w-100 h-100';

  if (className) {
    classes += ' ' + className;
  }

  return (
    <div className={classes} {...props}>
      {type === 'top' &&
        <div className="d-flex justify-content-center">
          <svg className="text-center d-block" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 37H4V17C4 14 6 10.5 9 8C12 5.5 18 4 18 4H30C30 4 36 5.5 39 8C42 10.5 44 14 44 17V37H37" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M37 17V44H11V17" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M30 4C30 5.5913 29.3679 7.11742 28.2426 8.24264C27.1174 9.36786 25.5913 10 24 10C22.4087 10 20.8826 9.36786 19.7574 8.24264C18.6321 7.11742 18 5.5913 18 4" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      }
      {type === 'bottom' &&
        <div className="d-flex justify-content-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M33 44H42L38 4H10L6 44H15L24 19L33 44Z" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M24 4V9.5" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M16.9999 4C16.9999 4 16.9999 10 14.9999 12C12.9999 14 8.8999 15 8.8999 15" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M31 4C31 4 31 10 33 12C35 14 39.1 15 39.1 15" stroke="#C1C1C1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      }
      <p className="text-center">Klik outfit {type === 'top' ? 'atasan' : 'bawahan'} yang ingin kamu pilih</p>
    </div>
  )
}

export default Placeholder
