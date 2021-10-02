import { Carousel, CarouselItem } from "react-bootstrap";
import './BannerCarousel.scss';

const BannerCarousel = ({ className, carousels }) => {
  let classes = `banner-carousel${className ? ' ' + className : ''}`;

  return (
    <Carousel className={classes} controls={false} fade={true}>
      {carousels.map(carousel => (
        <CarouselItem key={carousel.image} className="banner-carousel__item">
          <img
            className={`d-block h-100 w-100`}
            src={`http://192.168.100.7:8000${carousel.image}`}
            alt="Carousel_image"
          />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

export default BannerCarousel;