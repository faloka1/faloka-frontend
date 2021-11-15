import React, { useContext, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';


import InspireMePost from '../../components/InspireMePost/InspireMePost';
import PostPlaceholder from '../../components/InspireMePost/Placeholder/Placeholder'
import getInspireMePosts from '../../helpers/api/inspire-me/get-inspire-me-posts';
import { BASE_CONTENT_URL } from '../../config/api';
import { HomeContext } from '../../context/HomeContext/HomeContext';
import CreateInspireMeModal from '../../components/CreateInspireMeModal/CreateInspireMeModal';
import { useSelector } from 'react-redux';

const InspireMe = () => {
  const { showInspireMe, closeInspireMe } = useContext(HomeContext);
  const [posts, setPosts] = useState([]);
  const user = useSelector(state => state.auth.user);

  console.log(user)

  const { isLoading } = useQuery('inspire-me-posts', async () => {
    const response = await getInspireMePosts()

    return response.data;
  }, {
    onSuccess: (data) => {
      console.log(data);
      setPosts(data.map(im => ({
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
      })));
    },
    onError: (error) => console.log(error)
  });

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
    ])
  };

  return (
    <>
      <CreateInspireMeModal show={showInspireMe} onClose={closeInspireMe} onPosted={postedHandler} />
      <Container className="my-4">
        <Row>
          {!isLoading &&
            posts.map(post => (
              <Col key={post.id} xs={6} lg={3}>
                <InspireMePost post={post} />
              </Col>
            ))
          }
          {isLoading &&
            <>
              <Col xs={6} lg={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={6} lg={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={6} lg={3}>
                <PostPlaceholder />
              </Col>
              <Col xs={6} lg={3}>
                <PostPlaceholder />
              </Col>
            </>
          }
        </Row>
      </Container>
    </>
  );
};

export default InspireMe;