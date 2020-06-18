import React, { CSSProperties } from "react";
import "./Input.css";

type InputStyle = {
  type?: any;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  onChange?: any;
};

const InputUI = (property: InputStyle) => {
  let { type, value, style, className, placeholder, onChange } = property;
  return (
    <input
      type={type || "text"}
      value={value}
      style={style}
      className={`custom-input mt-3 ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputUI;
