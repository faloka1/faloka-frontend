import { Carousel, CarouselItem } from "react-bootstrap";

import './BannerCarousel.scss';

import { BASE_CONTENT_URL } from "../../config/api";

const BannerCarousel = ({ className, carousels }) => {
  let classes = `banner-carousel${className ? ' ' + className : ''}`;

  return (
    <Carousel className={classes} controls={false} fade={true}>
      {carousels.map(carousel => (
        <CarouselItem key={carousel.image_url} className="banner-carousel__item">
          <img
            className={`d-block h-100 w-100`}
            src={`${BASE_CONTENT_URL}${carousel.image_url}`}
            alt="Carousel_image"
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;