import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ProductCard from '../../../components/ProductCard/ProductCard';

const DUMMY_PRODUCTS = [
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
  {
    name: 'Baju besar bagus bersahaja',
    location: 'Surabaya',
    brandName: 'Toko Jaya Utama Mantap Jiwa',
    price: 98000,
    discount: 0.5,
  },
];

const ProductList = () => {
  const [products, setProducts] = useState(DUMMY_PRODUCTS);

  const appendProducts = () => {
    // append new products here
  };

  useEffect(() => {
    const check = () => {
      const scrollEnd = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 200;
      if (scrollEnd) {
        appendProducts();
      }
    };

    window.addEventListener('scroll', check);

    return () => {
      window.removeEventListener('scroll', check);
    }
  }, []);

  return (
    <Container>
      <Breadcrumb className="pt-5">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Home</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/products" }}>Blouse</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "#" }} active>Jumpsuit Elegan</Breadcrumb.Item>
      </Breadcrumb>
      <h3 className="text-center">Atasan</h3>
      <p className="text-muted text-center">(1200 produk ditemukan)</p>
      <Row xs={1} lg={2} xl={4} className="g-4 mb-5">
        {products.map((product, index) => (
          <Col key={index}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;