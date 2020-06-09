import React, { Component } from "react";
import "./Login.css";
import FormUI from "../../../components/Form/Form";
import InputUI from "../../../components/Input/Input";
// import Password from "../../../components/Password/Password";
import ButtonUI from "../../../components/Button/Button";

class Login extends Component {
  render() {
    return (
      <div className="row login">
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        <div className="col login-container">
          <FormUI>
            <h2 className="mb-2">Login</h2>
            <InputUI placeholder="Username" />
            <InputUI placeholder="Password" />
            {/* <Password></Password> */}
            {/* <input type="text" className="form-control" placeholder="Full Name" /> */}
            <div className="d-flex justify-content-center mt-4">
              <ButtonUI type="contain-dark">Login</ButtonUI>
            </div>
          </FormUI>
        </div>
        <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      </div>
    );
  }
}

export default Login;
