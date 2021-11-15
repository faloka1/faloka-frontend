import React from 'react'

import './InspireMePost.scss';

import useToggle from '../../hooks/use-toggle';
import InspireMeDetail from '../InspireMeDetail/InspireMeDetail';

const InspireMePost = ({ post }) => {
  const { toggle, setToggleOff, setToggleOn } = useToggle();

  const clickHandler = () => {
    setToggleOn();
  };

  return (
    <>
      <InspireMeDetail post={post} show={toggle} onClose={setToggleOff} />
      <div className="inspire-me-post mb-4" onClick={clickHandler}>
        <img className="inspire-me-post__photo w-100" src={post.photo} alt="" />
      </div>
    </>
  );
};

export default InspireMePost;