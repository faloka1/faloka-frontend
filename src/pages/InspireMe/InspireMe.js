import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';

import InspireMePost from '../../components/InspireMePost/InspireMePost';
import PostPlaceholder from '../../components/InspireMePost/Placeholder/Placeholder'
import getInspireMePosts from '../../helpers/api/inspire-me/get-inspire-me-posts';
import { BASE_CONTENT_URL } from '../../config/api';
import { HomeContext } from '../../context/HomeContext/HomeContext';
import CreateInspireMeModal from '../../components/CreateInspireMeModal/CreateInspireMeModal';

const InspireMe = () => {
  const { showInspireMe, closeInspireMe } = useContext(HomeContext);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [touchedBottomPage, setTouchedBottomPage] = useState(false);
  const [lastPage, setLastPage] = useState(9999999);
  const user = useSelector(state => state.auth.user);

  // fetch posts by page
  const { isLoading: isFetchingPosts } = useQuery(
    ['inspire-me-posts', { page }],
    async ({ queryKey }) => {
      const [, { page }] = queryKey;

      const response = await getInspireMePosts(page);

      return response.data;
    },
    {
      enabled: page <= lastPage,
      onSuccess: (data) => {
        setPosts(prevData => {
          const newData = data.data.map(im => ({
            id: im.id,
            photo: `${BASE_CONTENT_URL}${im.image_url}`,
            caption: im.caption,
            user: {
              name: im.user.name,
              profile_photo: `${BASE_CONTENT_URL}${im.user.photo_profile_url}`,
            },
            products: im.inspiremeproducts.map(imp => ({
              slug: imp.products.slug,
              image: `${BASE_CONTENT_URL}${imp.variants.variants_image[0].image_url}`,
              price: imp.products.price,
            }))
          }));

          return [...prevData, ...newData];
        });
        setTouchedBottomPage(false);
        setLastPage(data.last_page);
      },
      onError: (error) => console.log(error),
    }
  );
  // detect whether user have reached bottom page
  useEffect(() => {
    const check = () => {
      const scrollEnd = (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 400;

      if (scrollEnd && !isFetchingPosts && !touchedBottomPage && page <= lastPage) {
        setTouchedBottomPage(true);
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', check);

    return () => {
      window.removeEventListener('scroll', check);
    }
  }, [isFetchingPosts, lastPage, page, touchedBottomPage]);

  const postedHandler = (postData) => {
    setPosts(prev => [
      {
        id: postData.id,
        photo: postData.photo,
        caption: postData.caption,
        user: {
          name: user.name,
          profile_photo: user.profile_photo
        },
        products: postData.products
      },
      ...prev
    ]);
  };


  return (
    <>
      <CreateInspireMeModal show={showInspireMe} onClose={closeInspireMe} onPosted={postedHandler} />
      <Container className="my-4">
        <Row>
          {isFetchingPosts && page === 1 &&
            <>
              <Col xs={12} md={6} xl={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={12} md={6} xl={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={12} md={6} xl={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={12} md={6} xl={3}>
                <PostPlaceholder />
              </Col>
            </>
          }
          {posts.map(post => (
            <Col key={post.id} xs={12} md={6} xl={3}>
              <InspireMePost post={post} />
            </Col>
          ))}
        </Row>
        {isFetchingPosts && page > 1 &&
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        }
        {page > lastPage &&
          <p className="text-muted text-center mb-0">Kamu sudah melihat semua post.</p>
        }
      </Container>
    </>
  );
};

export default InspireMe;