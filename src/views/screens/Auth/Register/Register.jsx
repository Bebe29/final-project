import React, { Component, useState } from "react";
import "./Register.css";
import "../../Auth/Form.css";

import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";

// class Register extends Component {
//   state = {
//     showPassword: false,
//     showReapetPassword: false,
//   };

//   showPassHandler = () => {
//     this.setState({ showPassword: !this.state.showPassword });
//   };

//   showRepeatPassHandler = () => {
//     this.setState({ showReapetPassword: !this.state.showReapetPassword });
//   };

//   render() {
//     return (
//       <div className="row register">
//         <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
//         <div className="col register-container form">
//           <h2 className="mb-2">Register</h2>
//           <InputUI placeholder="Username" />
//           <InputUI placeholder="Full Name" />
//           <InputUI placeholder="Email" />
//           <PasswordUI
//             type={this.state.showPassword ? "text" : "password"}
//             placeholder="Password"
//             onClick={this.showPassHandler}
//           />
//           <PasswordUI
//             type={this.state.showReapetPassword ? "text" : "password"}
//             placeholder="Repeat Password"
//             onClick={this.showRepeatPassHandler}
//           />
//           <div className="d-flex justify-content-center mt-4">
//             <ButtonUI type="contain-dark">Register</ButtonUI>
//           </div>
//         </div>
//         <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
//       </div>
//     );
//   }
// }

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);

  return (
    <div className="row register">
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      <div className="col register-container form">
        <h2 className="mb-2">Register</h2>
        <InputUI placeholder="Username" />
        <InputUI placeholder="Full Name" />
        <InputUI placeholder="Email" />
        <PasswordUI
          type={showPass ? "text" : "password"}
          placeholder="Password"
          onClick={() => setShowPass(!showPass)}
        />
        <PasswordUI
          type={showRepeatPass ? "text" : "password"}
          placeholder="Repeat Password"
          onClick={() => setShowRepeatPass(!showRepeatPass)}
        />
        <div className="d-flex justify-content-center mt-4">
          <ButtonUI type="contain-dark">Register</ButtonUI>
        </div>
      </div>
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
    </div>
  );
};

export default Register;
