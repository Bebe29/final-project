import React, { CSSProperties } from "react";
import "./Input.css";

type InputStyle = {
  type?: any;
  pattern?: any;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  onChange?: any;
  id?: string;
};

const InputUI = (property: InputStyle) => {
  let {
    type,
    pattern,
    value,
    style,
    className,
    placeholder,
    onChange,
    id,
  } = property;
  return (
    <input
      id={id}
      type={type || "text"}
      pattern={pattern}
      value={value}
      style={style}
      className={`custom-input ${className}`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default InputUI;
