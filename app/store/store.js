import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {fork, all} from "redux-saga/effects";
import {logger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";

const makeRootSaga = (sagas) => {
  return function* rootSaga() {
    yield all(sagas.map((saga) => fork(saga)));
  };
};

export default (initialState = {}, reducers = {}, sagas = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [];

  middlewares.push(sagaMiddleware);

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const rootSaga = makeRootSaga(sagas);
  const rootReducer = combineReducers(reducers);
  const rootMiddleware = compose(applyMiddleware(...middlewares));
  let enhancer = rootMiddleware;

  if (process.env.NODE_ENV === `development`) {
    enhancer = composeWithDevTools(rootMiddleware);
  }

  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);
  return {store};
};
