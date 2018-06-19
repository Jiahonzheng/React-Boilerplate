export const FETCH_TEST_DATA = "FETCH_TEST_DATA";

export const WILL_FETCH_TEST_DATA = "WILL_FETCH_TEST_DATA";

export const DID_FETCH_TEST_DATA = "DID_FETCH_TEST_DATA";

export const fetchTestData = (params) => ({
  type: FETCH_TEST_DATA,
  payload: params
});

export const willFetchTestData = (params) => ({
  type: WILL_FETCH_TEST_DATA,
  payload: params
});

export const didFetchTestData = (params) => ({
  type: DID_FETCH_TEST_DATA,
  payload: params
});

export default {
  fetchTestData,
  willFetchTestData,
  didFetchTestData
};
