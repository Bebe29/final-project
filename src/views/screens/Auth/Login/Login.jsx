import React, { Component } from "react";
import "./Login.css";
import "../../Auth/Form.css";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";

class Login extends Component {
  render() {
    return (
      <div className="row login">
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        <div className="col login-container form">
          <h2 className="mb-2">Login</h2>
          <InputUI placeholder="Username" />
          <PasswordUI placeholder="Password" />
          <div className="d-flex justify-content-center mt-4">
            <ButtonUI type="contain-dark">Login</ButtonUI>
          </div>
        </div>
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      </div>
    );
  }
}

export default Login;
