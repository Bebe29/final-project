import React from "react";
import "./Form.css";

type FormType = {
  className?: string;
  children: any;
};

const FormUI = (property: FormType) => {
  let { className, children } = property;
  return <div className={`form ${className}`}>{children}</div>;
};

export default FormUI;
