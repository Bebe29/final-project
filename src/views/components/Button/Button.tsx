import React from "react";
import "./Button.css";

type ButtonType = {
  type?: "contain" | "outline" | "text" | "disable";
  children: any;
  className?: string;
  onClick?: any;
};

const ButtonUI = (property: ButtonType) => {
  let { type, children, className, onClick } = property;

  type = type || "contain";

  return (
    <div
      onClick={onClick}
      className={`custom-btn custom-btn-${type} ${className}`}
    >
      {children}
    </div>
  );
};

export default ButtonUI;
