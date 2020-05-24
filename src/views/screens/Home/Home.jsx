import React, { Component } from "react";
import "./Home.css";
import A from "../../../assets/Carousel/1.jpg";
import B from "../../../assets/Carousel/2.jpg";
import C from "../../../assets/Carousel/3.jpg";
import D from "../../../assets/Carousel/4.jpg";
import E from "../../../assets/Carousel/5.jpg";

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
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
}

export default Home;
