import React, { Component } from "react";
import "./About.css";

class About extends Component {
  render() {
    return (
      <div className="about-container" id="about">
        <h1 className="p-4">About Us</h1>
        <h4 className="p-4 about-content">
          {`
          At Petology, we provide pet supply and grooming service for your
          beloved dogs. We sell a wide selection and high-quality product just
          for your dogs. Our grooming service will make your dogs clean and
          stylish. We only use the best grooming product to groom your dog and
          we have the best groomer to groom your dog.
        `}
        </h4>
      </div>
    );
  }
}

export default About;
