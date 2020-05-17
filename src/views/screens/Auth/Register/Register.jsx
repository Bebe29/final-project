import React, { Component } from "react";
import FormUI from "../../../components/Form/Form";
import InputUI from "../../../components/Input/Input";

class Register extends Component {
  render() {
    return (
      <div className="row">
        {/* <div className="col-4"></div> */}
        <div className="col-4 p-5">
          <FormUI>
            <h2>Register</h2>
            <InputUI placeholder="Username"></InputUI>
            <InputUI placeholder="Full Name"></InputUI>
            <InputUI placeholder="Email"></InputUI>
            <InputUI placeholder="Password"></InputUI>
            <InputUI placeholder="Repeat Password"></InputUI>
            {/* <input type="text" className="form-control" placeholder="Full Name" /> */}
          </FormUI>
        </div>
      </div>
      // <div className="d-flex justify-content-center align-item-center register">
      //   <div>
      //     <h1>Register</h1>
      //   </div>
      // </div>
    );
  }
}

export default Register;
