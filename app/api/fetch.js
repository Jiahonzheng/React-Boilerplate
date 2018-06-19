const request = (url, method, body, type) => {
  let isOk;
  let options = {
    credentials: "same-origin",
    method
  };

  const data = type !== undefined ? body : JSON.stringify(body);

  if (type !== undefined) {
    options = {
      ...options,
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: data
    };
  } else {
    options = {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=utf-8"
      },
      body: data
    };
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => {
        isOk = response.ok;

        return response.json();
      })
      .then((responseData) => {
        if (isOk) {
          resolve(responseData);
        } else {
          reject(responseData);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default request;
