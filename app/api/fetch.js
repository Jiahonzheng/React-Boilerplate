const {DEBUG} = require("../../config");

const BASE_URL = DEBUG ? "" : "";

const request = (url, method, body, type) => {
  let options = {
    credentials: "same-origin",
    method
  };

  if (type !== undefined) {
    options = {
      ...options,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body
    };
  } else {
    options = {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(body)
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    return response.json();
  });
};

export default request;
