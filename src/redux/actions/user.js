import userTypes from "../types/user";
import Axios from "axios";
import { API_URL } from "../../constants/API";

const {
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  //   ON_LOGOUT_SUCCESS,
} = userTypes;

export const registerHandler = (newUser) => {
  return (dispatch) => {
    const { username, fullName, email, password, repeatPass } = newUser;
    if (username !== "" && fullName !== "" && email !== "" && password !== "") {
      if (password === repeatPass) {
        Axios.get(`${API_URL}/users`, {
          params: {
            username,
          },
        })
          .then((res) => {
            if (res.data.length > 0) {
              dispatch({
                type: ON_LOGIN_FAIL,
                payload: "The username already exists. Please try another one",
              });
            } else {
              Axios.get(`${API_URL}/users`, {
                params: {
                  email,
                },
              })
                .then((res) => {
                  if (res.data.length > 0) {
                    dispatch({
                      type: ON_LOGIN_FAIL,
                      payload:
                        "The email address already used. Please try another one",
                    });
                  } else {
                    Axios.post(`${API_URL}/users`, { ...newUser, role: "user" })
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
    Axios.get(`${API_URL}/users`, {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data.length > 0) {
          Axios.get(`${API_URL}/users`, {
            params: {
              password,
            },
          })
            .then((res) => {
              if (res.data.length > 0) {
                dispatch({
                  type: ON_LOGIN_SUCCESS,
                  payload: res.data[0],
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
          Axios.get(`${API_URL}/users`, {
            params: {
              password,
            },
          })
            .then((res) => {
              console.log(res.data);
              if (res.data.length > 0 && username !== res.data[0].username) {
                dispatch({
                  type: ON_LOGIN_FAIL,
                  payload: "Please enter a correct username",
                });
              } else {
                dispatch({
                  type: ON_LOGIN_FAIL,
                  payload: "Please enter a correct username and password",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
