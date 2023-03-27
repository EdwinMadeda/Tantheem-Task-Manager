import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Carousel.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1224 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1224, min: 864 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
  },
};

const CarouselSlider = (props) => {
  return (
    <div className={props.className}>
      <div>{props.title}</div>
      <Carousel
        containerClass="carousel-container"
        sliderClass="carousel-slider"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px carousel-item"
        showDots={true}
        renderDotsOutside={false}
        arrows={true}
        swipeable={true}
        draggable={true}
        responsive={responsive}
        partialVisible={true}
        focusOnSelect={false}
        centerMode={false}
        shouldResetAutoplay={true}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlay={false}
        //customTransition="all .5"
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        removeArrowOnDeviceType={['mobile']}
      >
        {props.content}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
