import React from "react";
import "./Form.css";

type FormType = {
  // className?: string
  children: any;
};

const FormUI = (property: FormType) => {
  let { children } = property;
  return <div className="form">{children}</div>;
};

export default FormUI;
