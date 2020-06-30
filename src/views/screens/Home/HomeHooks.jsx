import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import About from "../../screens/About/About";
import Footer from "../Footer/Footer";

const Home = () => {
  const [carousel, setCarousel] = useState({
    activeIndex: 0,
    animating: false,
    carouselData: [],
  });

  useEffect(() => {
    const getCarouselData = () => {
      Axios.get(`${API_URL}/carousels`)
        .then((res) => {
          setCarousel({ ...carousel, ["carouselData"]: res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCarouselData();
  }, []);

  const renderCarousel = () => {
    return carousel.carouselData.map(({ caption, content, image, id }) => {
      return (
        <CarouselItem
          onExiting={() =>
            setCarousel({ ...carousel, [carousel.animating]: true })
          }
          onExited={() =>
            setCarousel({ ...carousel, [carousel.animating]: false })
          }
          key={`carousel_${id}`}
        >
          <div className="row carousel-container">
            <div
              className="col custom-carousel-caption"
              style={{
                background: `url("${image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: "70%",
              }}
            >
              <div className="text-center">
                <h1>{caption}</h1>
                <p className="subtitle-lg">{content}</p>
              </div>
            </div>
          </div>
        </CarouselItem>
      );
    });
  };

  const next = () => {
    if (carousel.animating) return;
    let nextIndex =
      carousel.activeIndex === carousel.carouselData.length - 1
        ? 0
        : carousel.activeIndex + 1;
    setCarousel({ ...carousel, [carousel.activeIndex]: nextIndex });
  };

  const previous = () => {
    if (carousel.animating) return;
    let nextIndex =
      carousel.activeIndex === 0
        ? carousel.carouselData.length - 1
        : carousel.activeIndex - 1;
    setCarousel({ ...carousel, [carousel.activeIndex]: nextIndex });
  };

  const goToIndex = (newIndex) => {
    if (carousel.animating) return;
    setCarousel({ ...carousel, [carousel.activeIndex]: newIndex });
  };

  return (
    <>
      <div className="row">
        <div className="col pr-0">
          <Carousel
            activeIndex={carousel.activeIndex}
            next={next}
            previous={previous}
          >
            <CarouselIndicators
              items={carousel.carouselData}
              activeIndex={carousel.activeIndex}
              onClickHandler={goToIndex}
              className="carousel-indicators-round"
            />
            {renderCarousel()}
            <CarouselControl
              direction="prev"
              directionText="Previous"
              onClickHandler={previous}
            />
            <CarouselControl
              direction="next"
              directionText="Next"
              onClickHandler={next}
            />
          </Carousel>
          <About page={"home"} />
          <h1>Hello</h1>
          <h2>Hello</h2>
          <h3>Hello</h3>
          <h4>Hello</h4>
          <h5>Hello</h5>
          <h6>Hello</h6>
          <p>-------</p>
          <div className="subtitle-lg">Hello</div>
          <div className="subtitle-md">Hello</div>
          <div className="subtitle-sm">Hello</div>
          <div className="subtitle-xs">Hello</div>
          <div className="content-lg">Hello</div>
          <div className="content-md">Hello</div>
          <div className="content-sm">Hello</div>
          <div className="content-xs">Hello</div>
          <caption>Hello</caption>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
