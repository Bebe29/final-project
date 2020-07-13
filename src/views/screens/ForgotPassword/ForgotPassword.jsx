import React, { useState } from "react";
import "./ForgotPassword.css";

import Axios from "axios";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

import { API_URL } from "../../../constants/API";
import ButtonUI from "../../components/Button/Button";
import InputUI from "../../components/Input/Input";

const ForgotPassword = () => {
  const [emailReset, setEmailReset] = useState("");
  const [feedback, setFeedback] = useState("");

  const forgotHandler = () => {
    // console.log(emailReset);
    Axios.get(`${API_URL}/users/forgot`, {
      params: {
        email: emailReset,
      },
    })
      .then((res) => {
        // console.log(res);
        setFeedback(res);
        swal(
          "Reset Link",
          "Password reset link has been sent to your email",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (feedback) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="forgot-container">
        <h1>Forgot your password?</h1>
        <div className="mt-4 mb-3">
          Don't worry! Just fill in your email and we'll send you a link to
          reset your password.
        </div>
        <div className="forgot-input mb-3">
          <InputUI
            placeholder="Enter your email address"
            onChange={(e) => setEmailReset(e.target.value)}
          />
        </div>
        <ButtonUI onClick={forgotHandler} type="contain-dark" className="mt-2">
          Reset Password
        </ButtonUI>
      </div>
    );
  }
};

export default ForgotPassword;
