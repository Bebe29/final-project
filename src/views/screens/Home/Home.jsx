import React, { Component } from "react";
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

class Home extends Component {
  state = {
    activeIndex: 0,
    animating: false,
    carouselData: [],
  };

  componentDidMount() {
    this.getCarouselData();
  }

  getCarouselData = () => {
    Axios.get(`${API_URL}/carousels`)
      .then((res) => {
        this.setState({ carouselData: res.data });
        console.log(this.state.carouselData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderCarousel = () => {
    return this.state.carouselData.map(({ caption, content, image, id }) => {
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
      this.state.activeIndex === this.state.carouselData.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = () => {
    if (this.state.animating) return;
    let nextIndex =
      this.state.activeIndex === 0
        ? this.state.carouselData.length - 1
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
                items={this.state.carouselData}
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
