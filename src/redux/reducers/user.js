import userTypes from "../types/user";

const {
  ON_LOGIN_SUCCESS,
  ON_LOGIN_FAIL,
  ON_LOGOUT_SUCCESS,
  COOKIE_CHECK,
} = userTypes;

const init_state = {
  id: 0,
  username: "",
  role: "",
  errMsg: "",
  cookieChecked: false,
  activePage: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case ON_LOGIN_SUCCESS:
      const { id, username, role } = action.payload;
      return { ...state, id, username, role, errMsg: "", cookieChecked: true };
    case ON_LOGIN_FAIL:
      return { ...state, errMsg: action.payload, cookieChecked: true };
    case ON_LOGOUT_SUCCESS:
      return { ...init_state, cookieChecked: true };
    case COOKIE_CHECK:
      return { ...state, cookieChecked: true };
    default:
      return { ...state };
  }
};
