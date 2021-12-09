import React, { useState } from 'react';
import {
  Col,
  Container,
  Row,
  Spinner
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import './Detail.scss';

import ItemContainer from '../../../components/ItemContainer/ItemContainer';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductDetail from '../../../components/ProductDetail/ProductDetail';
import getProductDetail from '../../../helpers/api/get-product-detail';
import getRelatedProducts from '../../../helpers/api/get-related-products';
import ProductNotFound from '../../Error/ProductNotFound';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

const Detail = () => {
  const [breadcrumbData, setBreadcrumbData] = useState(null);
  const [foundProduct, setFoundProduct] = useState(true);
  const { productSlug } = useParams();
  const { data: product, ...productDetailQuery } = useQuery(
    ['product-detail', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;

      try {
        const response = await getProductDetail(productSlug);

        return response.data;
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          setFoundProduct(false);
        }
      }
    }, {
    onSuccess: (data) => {
      const home = {
        label: 'Home',
        path: {
          to: '/',
        }
      };
      const categories = data.categories.map(ct => ({
        label: ct.name,
        path: {
          to: '/products',
          search: `?categories=${ct.slug}`
        }
      }));
      const subCategory = {
        label: data.sub_categories.name,
        path: {
          to: '/products',
          search: `?subcategories=${data.sub_categories.slug}`
        }
      };
      const current = {
        label: data.name,
        path: {
          to: `/products/${data.slug}`
        },
        active: true
      }
      setBreadcrumbData([home, categories, subCategory, current]);
    }
  }
  );
  const { data: relatedProducts, ...relatedProductQuery } = useQuery(
    ['related-products', { productSlug }],
    async ({ queryKey }) => {
      const [, { productSlug }] = queryKey;

      try {
        const response = await getRelatedProducts(productSlug);

        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    {
      enabled: productDetailQuery.isSuccess
    }
  );

  if (productDetailQuery.isLoading) {
    return (
      <p className="fs-2 text-center my-4">Mengambil data..</p>
    )
  }

  if (!foundProduct || !!!product) {
    return (
      <ProductNotFound />
    );
  }

  return (!productDetailQuery.isLoading && !productDetailQuery.isError &&
    <>
      <Container>
        {!!breadcrumbData &&
          <Breadcrumb breadcrumbData={breadcrumbData} className="pt-5" />
        }
        <ProductDetail product={product} />
        <ItemContainer title="Mungkin Kamu Suka">
          {relatedProductQuery.isLoading &&
            <div className="d-flex justify-content-center my-3">
              <Spinner />
            </div>
          }
          {relatedProductQuery.isSuccess &&
            <Row md={2} lg={4} xl={4} className="g-4">
              {relatedProducts.map(rp => (
                <Col key={rp.slug}>
                  <ProductCard product={rp} />
                </Col>
              ))}
            </Row>
          }
        </ItemContainer>
      </Container>
    </>
  );
};

export default Detail;