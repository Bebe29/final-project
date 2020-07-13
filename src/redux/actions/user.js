import userTypes from "../types/user";
import Axios from "axios";
import Cookie from "universal-cookie";
import { API_URL } from "../../constants/API";

const {
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  ON_LOGOUT_SUCCESS,
  COOKIE_CHECK,
} = userTypes;

const cookieObj = new Cookie();

export const registerHandler = (newUser) => {
  return (dispatch) => {
    const { username, fullName, email, password, repeatPass } = newUser;
    if (username !== "" && fullName !== "" && email !== "" && password !== "") {
      if (password === repeatPass) {
        Axios.get(`${API_URL}/users/username`, {
          params: {
            username,
          },
        })
          .then((res) => {
            if (res.data) {
              dispatch({
                type: ON_LOGIN_FAIL,
                payload: "The username already exists. Please try another one",
              });
            } else {
              Axios.get(`${API_URL}/users/email`, {
                params: {
                  email,
                },
              })
                .then((res) => {
                  if (res.data) {
                    dispatch({
                      type: ON_LOGIN_FAIL,
                      payload:
                        "The email address already used. Please try another one",
                    });
                  } else {
                    Axios.post(`${API_URL}/users/register`, {
                      username,
                      fullName,
                      email,
                      password,
                      role: "user",
                    })
                      .then((res) => {
                        dispatch({
                          type: ON_LOGIN_SUCCESS,
                          payload: res.data,
                        });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        dispatch({
          type: ON_LOGIN_FAIL,
          payload: "Password don't match",
        });
      }
    } else {
      dispatch({
        type: ON_LOGIN_FAIL,
        payload: "The field cannot be left blank",
      });
    }
  };
};

export const loginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;
    Axios.get(`${API_URL}/users/username`, {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data) {
          Axios.get(`${API_URL}/users/login/${res.data.id}`, {
            params: {
              password,
            },
          })
            .then((res) => {
              if (res.data) {
                dispatch({
                  type: ON_LOGIN_SUCCESS,
                  payload: res.data,
                });
              } else {
                dispatch({
                  type: ON_LOGIN_FAIL,
                  payload: "Please enter a correct password",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Please enter a correct username",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const verifyLoginHandler = (userData) => {
  return (dispatch) => {
    const { username } = userData;
    Axios.get(`${API_URL}/users/username`, {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Please enter a correct username",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const keepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/${userData.id}`)
      .then((res) => {
        if (res.data) {
          dispatch({
            type: ON_LOGIN_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch({
            type: ON_LOGIN_FAIL,
            payload: "Username not found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const cookieChecker = () => {
  return {
    type: COOKIE_CHECK,
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  return {
    type: ON_LOGOUT_SUCCESS,
  };
};
