const initialState = [];

export default (state = initialState, action) {
  switch(action.type) {
    case "SOME_ACTION_TYPE":
      return state;
    default:
      return state;
  }
}