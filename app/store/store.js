import {applyMiddleware, compose, createStore, combineReducers} from "redux";
import createSagaMiddleware from "redux-saga";
import {fork, all} from "redux-saga/effects";
import {logger} from "redux-logger";
import {composeWithDevTools} from "redux-devtools-extension";
import {persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const makeRootSaga = (sagas) => {
  return function* rootSaga() {
    yield all(sagas.map((saga) => fork(saga)));
  };
};

export default (initialState = {}, reducers = {}, sagas = [], IS_SERVER) => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [];

  middlewares.push(sagaMiddleware);

  if (process.env.NODE_ENV === `development`) {
    middlewares.push(logger);
  }

  const rootSaga = makeRootSaga(sagas);
  const rootReducer = combineReducers(reducers);
  const rootMiddleware = compose(applyMiddleware(...middlewares));
  let enhancer = rootMiddleware;

  if (process.env.NODE_ENV === `development`) {
    enhancer = composeWithDevTools(rootMiddleware);
  }

  if (!IS_SERVER) {
    const PERSIST_CONFIG = {
      key: "root",
      storage: storage
    };
    const persistRootReducer = persistReducer(PERSIST_CONFIG, rootReducer);
    const store = createStore(persistRootReducer, initialState, enhancer);
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);
    return {store, persistor};
  }

  const store = createStore(rootReducer, initialState, enhancer);

  sagaMiddleware.run(rootSaga);
  return {store};
};
