import React, { CSSProperties } from "react";
import "./Input.css";

type InputStyle = {
  type?: any;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
};

const InputUI = (property: InputStyle) => {
  let { value, style, className, placeholder } = property;
  return (
    <input
      type="text"
      value={value}
      style={style}
      className={`custom-input mt-3 ${className}`}
      placeholder={placeholder}
    />
  );
};

export default InputUI;
