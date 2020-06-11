import React, { CSSProperties } from "react";
import "./Password.css";
import Eye from "../../../assets/Icon/eye.png"
// import Hide from "../../../assets/Icon/hide.png"

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
          src={Eye}
          alt=""
        />
        {/* <img
          className="eye"
          src={Hide}
          alt=""
        /> */}
      </div>
    </div>
  );
};

export default PasswordUI;
