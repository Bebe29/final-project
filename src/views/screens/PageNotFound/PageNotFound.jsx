import React from "react";
import "./PageNotFound.css";
import NotFound from "../../../assets/NotFound/fish.png";

const PageNotFound = () => {
  return (
    <div className="notfound-container ">
      <img src={NotFound} alt="" className="notfound-img" />
      <div className="notfound-text-container">
        <h1>404</h1>
        <h2>Sorry, Page not found</h2>
      </div>
    </div>
  );
};

export default PageNotFound;
