import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import Store from "./store";
import Main from "./pages/Main/Main";
import {PersistGate} from "redux-persist/lib/integration/react";

const MOUNT_NODE = document.getElementById("app");
const INITIAL_STATE = window.INITIAL_STATE || {};
const {store, persistor} = Store(INITIAL_STATE, false)();

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
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Route children={({match}) => <Main match={match} />} />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.hydrate(<App />, MOUNT_NODE);
