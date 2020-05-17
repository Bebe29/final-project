import React, { Component } from "react";
import FormUI from "../../../components/Form/Form";
import InputUI from "../../../components/Input/Input";
// import Password from "../../../components/Password/Password";
import ButtonUI from "../../../components/Button/Button";

class Register extends Component {
  render() {
    return (
      <div className="row">
        {/* <div className="col-4"></div> */}
        <div className="col-6">
          <FormUI>
            <h2 className="mb-2">Register</h2>
            <InputUI placeholder="Username"></InputUI>
            <InputUI placeholder="Full Name"></InputUI>
            <InputUI placeholder="Email"></InputUI>
            <InputUI placeholder="Password"></InputUI>
            <InputUI placeholder="Repeat Password"></InputUI>
            {/* <Password></Password> */}
            {/* <input type="text" className="form-control" placeholder="Full Name" /> */}
            <div className="d-flex justify-content-center mt-4">
              <ButtonUI type="contain-dark">Register</ButtonUI>
            </div>
          </FormUI>
        </div>
      </div>
    );
  }
}

export default Register;
