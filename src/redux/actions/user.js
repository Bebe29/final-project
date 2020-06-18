import userTypes from "../types/user";
// import Cookie from "universal-cookie";
import Axios from "axios";
import { API_URL } from "../../constants/API";

const {
  //   ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  //   ON_LOGOUT_SUCCESS,
} = userTypes;

// const cookieObj = new Cookie();

export const registerHandler = (newUser) => {
  return (dispatch) => {
    const { username, email, password, repeatPass } = newUser;
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
                      console.log(res.data);
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
  };
};
