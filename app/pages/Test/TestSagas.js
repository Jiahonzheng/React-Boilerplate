import {take, fork, call, put} from "redux-saga/effects";
import {
  FETCH_TEST_DATA,
  willFetchTestData,
  didFetchTestData
} from "./TestActions";
import fetch from "../../api/fetch";

function* fetchTestSaga(payload) {
  try {
    yield put(willFetchTestData());
    const data = yield call(fetch, "http://127.0.0.1:3000", "GET");
    console.log(data)
    yield put(didFetchTestData({hello: "react"}));
  } catch (err) {
    console.log(err);
  }
}

export function* watchTestSaga() {
  while (true) {
    const payload = yield take(FETCH_TEST_DATA);
    yield fork(fetchTestSaga, payload);
  }
}
