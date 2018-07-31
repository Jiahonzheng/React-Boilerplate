export const FETCH_TEST_DATA = "FETCH_TEST_DATA";

export const WILL_FETCH_TEST_DATA = "WILL_FETCH_TEST_DATA";

export const DID_FETCH_TEST_DATA = "DID_FETCH_TEST_DATA";

export const CLEAR = "CLEAR";

export const fetchTestData = () => ({
  type: FETCH_TEST_DATA
});

export const willFetchTestData = () => ({
  type: WILL_FETCH_TEST_DATA
});

export const didFetchTestData = (params) => ({
  type: DID_FETCH_TEST_DATA,
  payload: params
});

export const clear = (params) => ({
  type: CLEAR
});

export default {
  fetchTestData,
  willFetchTestData,
  didFetchTestData,
  clear
};
