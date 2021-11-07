import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import './Cart.scss';

import CartSelector from '../../components/CartSelector/CartSelector';
import ItemContainer from '../../components/ItemContainer/ItemContainer';
import ProductCardPlaceholder from '../../components/ProductCard/Placeholder/Placeholder';
import ProductCard from '../../components/ProductCard/ProductCard';
import CartSummary from './CartSummary/CartSummary';
import getCartRelated from '../../helpers/api/get-cart-related';

const Cart = () => {
  const items = useSelector(state => state.cart.items);
  const itemsEmpty = items.length === 0;
  const { isLoading, data } = useQuery('related-cart', async () => {
    const response = await getCartRelated();

    response.data.pop();

    return response.data;
  });

  return (
    <Container className="cart mt-5">
      {!itemsEmpty &&
        <Row className="border-bottom">
          <Col xl={8} lg={8}>
            <p className="h4 mb-4">Keranjang</p>
            <CartSelector />
          </Col>
          <Col xl={4} lg={4}>
            <CartSummary />
          </Col>
        </Row>
      }
      {itemsEmpty &&
        <>
          <img src="/assets/images/empty-cart.png" alt="empty-cart" className="cart__empty-image d-block mx-auto w-25 mb-4 mt-5" />
          <p className="text-center h4 text-gray fw-bold">Keranjangmu masih kosong.</p>
        </>
      }
      <ItemContainer title="Mungkin kamu suka">
        <Row xs={1} sm={2} lg={4} className="g-4">
          {isLoading &&
            [1, 2, 3, 4].map(x => (
              <Col key={x}>
                <ProductCardPlaceholder />
              </Col>
            ))
          }
          {!isLoading &&
            data.map(product => (
              <Col key={product.id}>
                <ProductCard product={product} />
              </Col>
            ))
          }
        </Row>
      </ItemContainer>
    </Container>
  );
};

export default Cart;