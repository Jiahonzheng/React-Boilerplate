import React from "react";
import {renderToString} from "react-dom/server";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/lib/integration/react";
import {StaticRouter} from "react-router-dom";
import Store from "../app/store";
import Main from "../app/pages/Main/Main";

function HTMLTemplate(reactDOM) {
  return `
  <!DOCTYPE html>
  <html>
  
  <head>
    <meta charset="utf-8">
    <title>React-Boilerplate</title>
  </head>
  
  <body>
    <div id="app">${reactDOM}</div>
    <script src="bundle.js"></script>
  </body>
  
  </html>
  `;
}

const JSX = function(store, persistor) {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Main />
      {/* </PersistGate> */}
    </Provider>
  );
};

function ssr(req, res) {
  const {store} = Store({}, true)();
  const reactDOM = renderToString(JSX(store));

  res.writeHead(200, {"Content-Type": "text/html"});
  res.end(HTMLTemplate(reactDOM));
}

export default ssr;
