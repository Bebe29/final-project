import React, { CSSProperties } from "react";
import "./Password.css";
import Eye from "../../../assets/Icon/eye.png";
import Hide from "../../../assets/Icon/hide.png";

type PasswordStyle = {
  type?: any;
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  onClick?: any;
  onChange?: any;
};

const PasswordUI = (property: PasswordStyle) => {
  let { type, value, className, placeholder, onClick, onChange } = property;
  return (
    <div className={`d-flex password mt-3 ${className}`}>
      <input
        type={type}
        value={value}
        className="password-input"
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className="password-eye" onClick={onClick}>
        {type === "password" ? (
          <img className="eye" src={Eye} alt="" />
        ) : (
          <img className="eye" src={Hide} alt="" />
        )}
      </div>
    </div>
  );
};

export default PasswordUI;
