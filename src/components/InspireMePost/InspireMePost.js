import React from 'react'

import './InspireMePost.scss';

import useToggle from '../../hooks/use-toggle';
import InspireMeDetail from '../InspireMeDetail/InspireMeDetail';

const InspireMePost = (props) => {
  const { toggle, setToggleOff, setToggleOn } = useToggle();

  const clickHandler = () => {
    setToggleOn();
  };

  return (
    <>
      <InspireMeDetail show={toggle} onClose={setToggleOff} />
      <div className="inspire-me-post" onClick={clickHandler}>
        <img className="inspire-me-post__photo w-100 mb-2" src={`./assets/images/products/product_${props.photo}.png`} alt="" />
        <p className="text-center">This is just an ordinary post</p>
      </div>
    </>
  );
};

export default InspireMePost;