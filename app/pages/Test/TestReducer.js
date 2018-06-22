import {DID_FETCH_TEST_DATA, CLEAR} from "./TestActions";

let INITIAL_STATE = {};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DID_FETCH_TEST_DATA:
      return Object.assign({}, state, action.payload);
    case CLEAR:
      return Object.assign({});
    default:
      return state;
  }
};

export default testReducer;
