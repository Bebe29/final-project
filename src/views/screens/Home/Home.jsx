import React, { Component } from "react";
import "./Home.css";
import A from "../../../assets/Carousel/1.jpg";
import B from "../../../assets/Carousel/2.jpg";
import C from "../../../assets/Carousel/3.jpg";
import {
  Carousel,
  CarouselItem,
  CarouselCaption,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";
import D from "../../../assets/Carousel/4.jpg";

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
          <div className="d-flex carousel-container">
            <img src={image} alt="" />
            <div className="carousel-caption">
              <h3>{caption}</h3>
              <h3 className="subtitle-lg">{content}</h3>
            </div>
          </div>
          {/* <CarouselCaption
            captionHeader={caption}
            captionText={content}
            className="carousel-caption"
          /> */}
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
      // <div>
      //   <h1>Hello</h1>
      // </div>
      <>
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
      </>
    );
  }
}

export default Home;
