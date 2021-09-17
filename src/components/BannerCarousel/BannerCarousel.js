import { Carousel, CarouselItem } from "react-bootstrap";

import './BannerCarousel.scss';

const BannerCarousel = ({ className }) => {
  let classes = `banner-carousel${className ? ' ' + className : ''}`;

  return (
    <Carousel className={classes}>
      <CarouselItem>
        <img
          className="d-block w-100"
          src="/assets/images/banners/banner_1.png"
          alt="banner"
        />
      </CarouselItem>
      <CarouselItem>
        <img
          className="d-block w-100"
          src="/assets/images/banners/banner_2.png"
          alt="banner"
        />
      </CarouselItem>
    </Carousel>
  );
};

export default BannerCarousel;