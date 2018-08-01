import TestReducer from "../pages/Test/TestReducer";
import {watchTestSaga} from "../pages/Test/TestSagas";
import Store from "./store";

const reducers = {
  testReducer: TestReducer
};

const sagas = [watchTestSaga];

export default (initialState = {}) => () =>
  Store(initialState, reducers, sagas);
