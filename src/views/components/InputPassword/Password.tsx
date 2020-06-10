import React, { CSSProperties } from "react";
import "./Password.css";

type PasswordStyle = {
  type?: any;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
};

const PasswordUI = (property: PasswordStyle) => {
  let { value, className, placeholder } = property;
  return (
    <div className={`d-flex password mt-3 ${className}`}>
      <input
        type="text"
        value={value}
        className="password-input"
        placeholder={placeholder}
      />
      <div className="password-eye">
        <img
          className="eye"
          src="https://img.icons8.com/material-outlined/24/000000/visible.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default PasswordUI;
