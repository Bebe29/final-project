import React, { useState } from "react";
import "./Login.css";
import "../../Auth/Form.css";
import { Link } from "react-router-dom";
import InputUI from "../../../components/Input/Input";
import ButtonUI from "../../../components/Button/Button";
import PasswordUI from "../../../components/InputPassword/Password";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState({
    showPassword: false,
  });

  const inputHandler = (e, field) => {
    const { value } = e.target;
    setInput({ ...input, [field]: value });
  };

  const showHandler = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const loginHandler = () => {
    console.log(input.username);
    console.log(input.password);
  };

  return (
    <div className="row login">
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
      <div className="col login-container form">
        <h2 className="mb-3">Login</h2>
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
        <div className="content-md mt-4">
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
        <div className="d-flex justify-content-center mt-4">
          <ButtonUI type="contain-dark" onClick={loginHandler}>
            Login
          </ButtonUI>
        </div>
      </div>
      <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
    </div>
  );
};

export default Login;
