import React, { useState } from "react";
import "./Register.css";
import "../../Auth/Form.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";
import { registerHandler } from "../../../../redux/actions";

const Register = ({ user, onRegister }) => {
  const [input, setInput] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    repeatPass: "",
  });
  const [show, setShow] = useState({
    showPassword: false,
    showRepeatPassword: false,
  });

  const inputHandler = (e, field) => {
    const { value } = e.target;
    setInput({ ...input, [field]: value });
  };

  const showHandler = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const registerBtnHandler = () => {
    let newUser = input;
    onRegister(newUser);
  };

  return (
    <div className="row register">
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      <div className="col register-container form">
        <h2 className="mb-3">Register</h2>
        {user.errMsg ? (
          <div className="content-sm error-msg">{user.errMsg}</div>
        ) : null}
        <InputUI
          value={input.username}
          placeholder="Username"
          onChange={(e) => inputHandler(e, "username")}
        />
        <InputUI
          value={input.fullName}
          placeholder="Full Name"
          onChange={(e) => inputHandler(e, "fullName")}
        />
        <InputUI
          value={input.email}
          placeholder="Email"
          onChange={(e) => inputHandler(e, "email")}
        />
        <PasswordUI
          value={input.password}
          type={show.showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => inputHandler(e, "password")}
          onClick={() => showHandler("showPassword")}
        />
        <PasswordUI
          value={input.repeatPass}
          type={show.showRepeatPassword ? "text" : "password"}
          placeholder="Repeat Password"
          onChange={(e) => inputHandler(e, "repeatPass")}
          onClick={() => showHandler("showRepeatPassword")}
        />
        <div className="content-md mt-4" style={{ color: "#645954" }}>
          {`Already have an account? `}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#312A27",
              fontWeight: "600",
            }}
          >
            Login here
          </Link>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <ButtonUI type="contain-dark" onClick={registerBtnHandler}>
            Register
          </ButtonUI>
        </div>
      </div>
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  onRegister: registerHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
