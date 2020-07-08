import React, { CSSProperties } from "react";
import "./InputFile.css";
// import ButtonUI from "../../components/Button/Button";

type PasswordStyle = {
  value?: any;
  style?: CSSProperties;
  className?: string;
  placeholder?: string;
  onClick?: any;
  onChange?: any;
  children?: string;
};

const FileUI = (property: PasswordStyle) => {
  let { className, onChange, children } = property;
  return (
    <div className={`d-flex password mt-3 ${className}`}>
      <p className="inputFile-input">
        {(children = children || "Choose product image")}
      </p>
      {/* <input
        type="text"
        className="inputFile-input"
        placeholder="Choose product image"
        value={value}
      /> */}
      <label className="inputFile-btn">
        Browse
        <input
          type="file"
          id="productImage"
          style={{ display: "none" }}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default FileUI;
