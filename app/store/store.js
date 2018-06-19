import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {fork, all} from "redux-saga/effects";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {logger} from "redux-logger";

const PERSIST_CONFIG = {
  key: "root",
  storage: storage
};

const makeRootSaga = (sagas) => {
  return function* rootSaga() {
    yield all(sagas.map((saga) => fork(saga)));
  };
};

export default (initialState = {}, reducers = {}, sagas = []) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [];

  middlewares.push(sagaMiddleware);
  middlewares.push(logger);

  const rootSaga = makeRootSaga(sagas);
  const rootReducer = combineReducers(reducers);
  const rootMiddleware = compose(applyMiddleware(...middlewares));
  const persistRootReducer = persistReducer(PERSIST_CONFIG, rootReducer);
  const store = createStore(persistRootReducer, initialState, rootMiddleware);
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {store, persistor};
};
