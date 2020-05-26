import React, { Component } from "react";
import "./Home.css";
import A from "../../../assets/Carousel/1.jpg";
import B from "../../../assets/Carousel/2.jpg";
import C from "../../../assets/Carousel/3.jpg";
import { Carousel } from "reactstrap";
// import D from "../../../assets/Carousel/4.jpg";
// import E from "../../../assets/Carousel/5.jpg";

const dummyCarousel = [
  {
    caption: `Welcome to PETOLOGY`,
    content: `We provide pet supply and grooming for your lovely cats and dogs`,
    buttonText: ``,
    image: A,
    id: 1,
  },
  {
    caption: `Buy all your pet needs in here`,
    buttonText: `We have all the best products for your pet`,
    image: B,
    id: 2,
  },
  {
    caption: `Grooming your lovely pets`,
    buttonText: `Our professional groomer will make your furriest friend looking and smelling great`,
    image: C,
    id: 3,
  },
];

class Home extends Component {
  render() {
    return (
      // <div>
      //   <h1>Hello</h1>
      // </div>
      <>
      <Carousel>
        
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
