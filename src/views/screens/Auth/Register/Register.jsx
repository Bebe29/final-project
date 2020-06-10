import React, { Component } from "react";
import "./Register.css";
import "../../Auth/Form.css";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";

class Register extends Component {
  render() {
    return (
      <div className="row register">
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        <div className="col register-container form">
          <h2 className="mb-2">Register</h2>
          <InputUI placeholder="Username" />
          <InputUI placeholder="Full Name" />
          <InputUI placeholder="Email" />
          <PasswordUI placeholder="Password" />
          <PasswordUI placeholder="Repeat Password" />
          <div className="d-flex justify-content-center mt-4">
            <ButtonUI type="contain-dark">Register</ButtonUI>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      </div>
    );
  }
}

export default Register;
