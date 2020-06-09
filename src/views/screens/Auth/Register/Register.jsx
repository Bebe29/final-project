import React, { Component } from "react";
import "./Register.css";
import FormUI from "../../../components/Form/Form";
import InputUI from "../../../components/Input/Input";
// import Password from "../../../components/Password/Password";
import ButtonUI from "../../../components/Button/Button";

class Register extends Component {
  render() {
    return (
      <div className="d-flex">
        <div className="" style={{ backgroundColor: "red" }}></div>
        <div className="row register">
          <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
          <div className="col register-container">
            <FormUI>
              <h2 className="mb-2">Register</h2>
              <InputUI placeholder="Username" />
              <InputUI placeholder="Full Name" />
              <InputUI placeholder="Email" />
              <InputUI placeholder="Password" />
              <InputUI placeholder="Repeat Password" />
              {/* <Password></Password> */}
              {/* <input type="text" className="form-control" placeholder="Full Name" /> */}
              <div className="d-flex justify-content-center mt-4">
                <ButtonUI type="contain-dark">Register</ButtonUI>
              </div>
            </FormUI>
          </div>
          <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
        </div>
        <div className="" style={{ backgroundColor: "red" }}></div>
      </div>
    );
  }
}

export default Register;
