import React, { CSSProperties } from "react";
import "./Button.css";

type ButtonType = {
  type?:
    | "contain"
    | "outline"
    | "text"
    | "disable"
    | "contain-dark"
    | "user"
    | "outline-dark"
    | "text-dark";
  children: any;
  style?: CSSProperties;
  className?: string;
  onClick?: any;
};

const ButtonUI = (property: ButtonType) => {
  let { type, children, style, className, onClick } = property;

  type = type || "contain";

  return (
    <div
      style={style}
      onClick={onClick}
      className={`custom-btn custom-btn-${type} ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonUI;
