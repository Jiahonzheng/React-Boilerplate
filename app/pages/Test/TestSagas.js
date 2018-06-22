import {take, fork, call, put} from "redux-saga/effects";
import {
  FETCH_TEST_DATA,
  willFetchTestData,
  didFetchTestData
} from "./TestActions";
import fetch from "../../api/fetch";

function* fetchTestSaga() {
  try {
    yield put(willFetchTestData());
    const message = yield call(fetch, "http://127.0.0.1:3000/test", "GET");
    yield put(didFetchTestData(message));
  } catch (err) {
    console.log(err);
  }
}

export function* watchTestSaga() {
  while (true) {
    yield take(FETCH_TEST_DATA);
    yield fork(fetchTestSaga);
  }
}
