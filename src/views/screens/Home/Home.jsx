import React, { Component } from "react";
import "./Home.css";
import B from "../../../assets/Carousel/2.jpg";
import C from "../../../assets/Carousel/3.jpg";
import D from "../../../assets/Carousel/4.jpg";
// import E from "../../../assets/Carousel/5.jpg";
// import F from "../../../assets/Carousel/6.jpg";
// import G from "../../../assets/Carousel/7.jpg";
// import H from "../../../assets/Carousel/8.jpg";
// import I from "../../../assets/Carousel/9.jpg";
// import J from "../../../assets/Carousel/10.jpg";
// import K from "../../../assets/Carousel/11.jpg";
// import L from "../../../assets/Carousel/12.jpg";
// import M from "../../../assets/Carousel/13.jpg";
// import N from "../../../assets/Carousel/14.jpg";
// import O from "../../../assets/Carousel/15.jpg";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import About from "../../screens/About/About";
import Footer from "../Footer/Footer";

const dummyCarousel = [
  {
    caption: `Welcome to PETOLOGY`,
    content: `We provide pet supply and grooming for your lovely cats and dogs`,
    buttonText: ``,
    image: C,
    id: 1,
  },
  {
    caption: `Buy all your pet needs in here`,
    content: `We have all the best products for your pet`,
    buttonText: `Shop Now`,
    image: B,
    id: 2,
  },
  {
    caption: `Grooming your lovely pets`,
    content: `Our professional groomer will make your furriest friend looking and smelling great`,
    buttonText: `Book Now`,
    image: D,
    id: 3,
  },
];

class Home extends Component {
  state = {
    activeIndex: 0,
    animating: false,
  };

  renderCarousel = () => {
    return dummyCarousel.map(({ caption, content, buttonText, image, id }) => {
      return (
        <CarouselItem
          onExiting={() => this.setState({ animating: true })}
          onExited={() => this.setState({ animating: false })}
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

  next = () => {
    if (this.state.animating) return;
    let nextIndex =
      this.state.activeIndex === dummyCarousel.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    let nextIndex =
      this.state.activeIndex === 0
        ? dummyCarousel.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = (newIndex) => {
    if (this.state.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  render() {
    return (
      <>
        <div className="row">
          <div className="col pr-0">
            <Carousel
              activeIndex={this.state.activeIndex}
              next={this.next}
              previous={this.previous}
            >
              <CarouselIndicators
                items={dummyCarousel}
                activeIndex={this.state.activeIndex}
                onClickHandler={this.goToIndex}
                className="carousel-indicators-round"
              />
              {this.renderCarousel()}
              <CarouselControl
                direction="prev"
                directionText="Previous"
                onClickHandler={this.previous}
              />
              <CarouselControl
                direction="next"
                directionText="Next"
                onClickHandler={this.next}
              />
            </Carousel>
            <About />
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
  }
}

export default Home;
