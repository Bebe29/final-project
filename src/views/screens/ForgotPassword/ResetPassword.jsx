import React, { useState } from "react";
import "./ForgotPassword.css";

import Axios from "axios";
import { useRouteMatch, Redirect } from "react-router-dom";

import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import PasswordUI from "../../components/InputPassword/Password";
import swal from "sweetalert";

const ResetPassword = () => {
  const [input, setInput] = useState({
    password: "",
    repeatPass: "",
  });
  const [show, setShow] = useState({
    showPassword: false,
    showRepeatPassword: false,
  });
  const [feedback, setFeedback] = useState("");

  let match = useRouteMatch({
    path: "/forgot/:username",
    strict: true,
    sensitive: true,
  });

  const inputHandler = (e, field) => {
    const { value } = e.target;
    setInput({ ...input, [field]: value });
  };

  const showHandler = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const resetHandler = () => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    console.log(match.params.username);
    if (input.password === input.repeatPass) {
      Axios.get(`${API_URL}/users/forgot/${match.params.username}`, {
        params: {
          token: urlToken,
          password: input.password,
        },
      })
        .then((res) => {
          // console.log(res.data);
          if (res.data === "Your password has been changed successfully") {
            swal("Password changed!", res.data, "success");
            setFeedback(res);
          } else {
            swal(`${res.data}!`, "Please use other password", "error");
            setInput({ password: "", repeatPass: "" });
            setShow({ showPassword: false, showRepeatPassword: false });
          }
        })
        .catch((err) => {
          console.log(err);
          swal(`Error!`, "Please insert password", "error");
          setInput({ password: "", repeatPass: "" });
          setShow({ showPassword: false, showRepeatPassword: false });
        });
    } else {
      swal("Password doesn't match!", "Please insert password again", "error");
      setInput({ password: "", repeatPass: "" });
      setShow({ showPassword: false, showRepeatPassword: false });
    }
  };

  if (feedback) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="forgot-container">
        <h1>Reset your password</h1>
        <div className="mt-4 mb-3">
          Please enter and confirm your new password bellow to change your
          account password.
        </div>
        <div className="forgot-input mb-3">
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
        </div>
        <ButtonUI onClick={resetHandler} type="contain-dark" className="mt-2">
          Change Password
        </ButtonUI>
      </div>
    );
  }
};

export default ResetPassword;
