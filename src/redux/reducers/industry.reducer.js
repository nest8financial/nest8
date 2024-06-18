const industries = (state = [], action) => {
  if (action.type === "SET_INDUSTRY") {
    return action.payload;
  }
  return state;
};

// user will be on the redux state at:
// state.user
export default industries;
