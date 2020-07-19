import React, { useEffect, useState } from "react";
import "./VerifyAccount.css";
import ButtonUI from "../../../components/Button/Button";
import Axios from "axios";
import { API_URL } from "../../../../constants/API";
import { connect } from "react-redux";
import { logoutHandler } from "../../../../redux/actions";
import Cookie from "universal-cookie";
import { Redirect, useRouteMatch } from "react-router-dom";
import swal from "sweetalert";

const VerifyAccount = ({ user, logoutHandler }) => {
  const [userVerified, setUserVerified] = useState(false);
  let match = useRouteMatch({
    path: "/verify/:username",
    strict: true,
    sensitive: true,
  });
  const cookie = new Cookie();

  useEffect(() => {
    if (cookie.get("authData", { path: "/" }) && !userVerified) {
      console.log(userVerified);
      logoutHandler();
    }
  });

  const verifyHandler = () => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    Axios.get(`${API_URL}/users/verify/${match.params.username}`, {
      params: {
        token: urlToken,
      },
    })
      .then((res) => {
        // console.log(res.data);
        swal(
          "Verification Success!",
          "We have successfully verified your account",
          "success"
        );
        setUserVerified(true);
        // console.log(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (userVerified) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="verify-container">
      <h1>Welcome to Petology</h1>
      <div className="mt-4 mb-3">
        To complete verify account, please click the button below
      </div>
      <ButtonUI onClick={verifyHandler}>Verify your account now</ButtonUI>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  logoutHandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyAccount);
