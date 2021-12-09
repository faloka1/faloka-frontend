import React, { useState } from 'react'

import './InspireMePost.scss';

import useToggle from '../../hooks/use-toggle';
import InspireMeDetail from '../InspireMeDetail/InspireMeDetail';

const InspireMePost = ({ post }) => {
  const { toggle, setToggleOff, setToggleOn } = useToggle();
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const clickHandler = () => {
    setToggleOn();
  };

  const loadedImageHandler = () => {
    setImageIsLoaded(true);
    console.log('loaded!');
  };

  return (
    <>
      <InspireMeDetail post={post} show={toggle} onClose={setToggleOff} />
      <div className="inspire-me-post mb-4 placeholder-glow" onClick={clickHandler}>
        {!imageIsLoaded && <span className="inspire-me-post__photo w-100 h-100 placeholder placeholder"></span>}
        <img className={`inspire-me-post__photo w-100 h-100 ${!imageIsLoaded ? 'd-none' : ''}`} src={post.photo} alt="" onLoad={loadedImageHandler} />
      </div>
    </>
  );
};

export default InspireMePost;