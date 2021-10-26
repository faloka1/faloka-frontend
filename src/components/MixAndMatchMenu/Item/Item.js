import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ image, path, ...props }) => {
  return (
    <div className="item d-flex flex-column justify-content-between h-100">
      <img className="w-100 mb-2" src={image} alt="item" />
      <Link className="d-block text-center" to={path}>Beli</Link>
    </div>
  )
}

export default Item
