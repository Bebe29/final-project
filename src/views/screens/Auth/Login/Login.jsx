import React, { useState } from "react";
import "./Login.css";
import "../../Auth/Form.css";
import { Redirect, Link } from "react-router-dom";
import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";
import { connect } from "react-redux";
import { loginHandler } from "../../../../redux/actions";
import Cookie from "universal-cookie";

const Login = ({ user, onLogin }) => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState({
    showPassword: false,
  });

  if (user.id) {
    const cookie = new Cookie();
    cookie.set("authData", JSON.stringify(user), { path: "/" });
  }

  const inputHandler = (e, field) => {
    const { value } = e.target;
    setInput({ ...input, [field]: value });
  };

  const showHandler = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const loginBtnHandler = () => {
    let userData = input;
    onLogin(userData);
  };

  if (user.id > 0) {
    return <Redirect to="/" />;
  }
  return (
    <div className="row login">
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      <div className="col login-container form">
        <h2 className="mb-2">Login</h2>
        <div className="content-md mb-3">
          {`New to Petology? `}
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "#645954",
              fontWeight: "600",
            }}
          >
            Sign up here
          </Link>
        </div>
        {user.errMsg ? (
          <div className="content-sm error-msg">{user.errMsg}</div>
        ) : null}
        <InputUI
          value={input.username}
          placeholder="Username"
          onChange={(e) => inputHandler(e, "username")}
        />
        <PasswordUI
          value={input.password}
          type={show.showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => inputHandler(e, "password")}
          onClick={() => showHandler("showPassword")}
        />
        <div
          className="content-sm mt-2"
          style={{ color: "#645954" }}
        >{`Forgot your password?`}</div>
        <div className="d-flex justify-content-center mt-4">
          <ButtonUI type="contain-dark" onClick={loginBtnHandler}>
            Login
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
  onLogin: loginHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
