import React from 'react';

import './ProductCardCart.scss';

const ProductCardCart = ({ className, productCart }) => {
  const {
    name,
    size,
    price,
    quantity,
    image_url,
  } = productCart
  return (
    <div className={`product-card-cart border${className ? ' ' + className : ''} d-flex align-items-center`}>
      <img src={"/assets/images/products/product_1.png"} alt="product_image" />
      <div className="flex-grow-1">
        <p className="mb-0">Blouse Bagus</p>
        <p className="mb-3"><span className="text-gray">Ukuran : </span> All Size</p>
        <p className="mb-0"><strong>Rp80.000</strong></p>
      </div>
      <p className="price mb-0"><strong>1x</strong></p>
    </div >
  );
};

export default ProductCardCart;