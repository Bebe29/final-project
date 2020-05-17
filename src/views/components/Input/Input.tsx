import React from "react";
import "./Input.css";

type InputStyle = {
  value?: any;
  placeholder?: string;
};

const InputUI = (property: InputStyle) => {
  let { value, placeholder } = property;
  return (
    <input
      type="text"
      value={value}
      className="input mt-3"
      placeholder={placeholder}
    />
    // <div className="d-flex justify-content-center input mt-3">{children}</div>
  );
};

export default InputUI;
