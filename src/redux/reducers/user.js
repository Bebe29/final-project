import userTypes from "../types/user";

const { ON_LOGIN_SUCCESS, ON_LOGIN_FAIL, ON_LOGOUT_SUCCESS } = userTypes;

const init_state = {
  id: 0,
  role: "",
  errMsg: "",
  cookieChecked: false,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload };
    case ON_LOGOUT_SUCCESS:
    default:
      return { ...state };
  }
};
