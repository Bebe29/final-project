import React, { CSSProperties } from "react";
import "../screens/Home/Home.css";

type CarouselType = {
  image?: any;
  className?: string;
  style?: CSSProperties;
};

const CarouselContentUI = (property: CarouselType) => {
  let { className, style } = property;
  return (
    <div className="row" style={style}>
      <div className="col"></div>
    </div>
  );
};

export default CarouselContentUI;
