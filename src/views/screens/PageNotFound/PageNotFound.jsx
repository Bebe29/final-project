import React, { Component } from "react";
import "./PageNotFound.css";
import NotFound from "../../../assets/NotFound/fish.png";

class PageNotFound extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <img src={NotFound} alt="" className="notfound-img" />
        </div>
        <div className="col">
          <h1>404</h1>
          <h2>Sorry, Page not found</h2>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
