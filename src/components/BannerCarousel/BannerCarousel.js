import { Carousel, CarouselItem } from "react-bootstrap";
import './BannerCarousel.scss';

const BannerCarousel = ({ className, carousels }) => {
  let classes = `banner-carousel${className ? ' ' + className : ''}`;

  return (
    <Carousel className={classes} controls={false} fade={true}>
      {carousels.map(carousel => (
        <CarouselItem key={carousel.image_url} className="banner-carousel__item">
          <img
            className={`d-block h-100 w-100`}
            src={`http://13.59.13.137${carousel.image_url}`}
            alt="Carousel_image"
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;