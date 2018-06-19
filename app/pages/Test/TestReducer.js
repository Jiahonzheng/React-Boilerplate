import {DID_FETCH_TEST_DATA} from "./TestActions";

let INITIAL_STATE = {};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DID_FETCH_TEST_DATA:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default testReducer;
