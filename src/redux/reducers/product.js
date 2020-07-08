const init_state = {
  category: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "ON_CATEGORY_INPUT":
      return { ...state };
    default:
      return { ...state };
  }
};
