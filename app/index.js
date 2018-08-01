import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Store from "./store";
import Main from "./pages/Main/Main";

const MOUNT_NODE = document.getElementById("app");
const INITIAL_STATE = window.INITIAL_STATE || {};
const {store} = Store(INITIAL_STATE)();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidCatch(err, info) {
    console.log(err, info);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route children={({match}) => <Main match={match} />} />
        </BrowserRouter>
      </Provider>
    );
  }
}

if (process.env.NODE_ENV === `development`) {
  ReactDOM.render(<App />, MOUNT_NODE);
} else {
  ReactDOM.hydrate(<App />, MOUNT_NODE);
}
