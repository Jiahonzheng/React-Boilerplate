import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Test from "../Test/Test";

import "../../test.css";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Route path="/test" component={() => <Test />} />
        <Route
          exact
          path="/"
          component={() => (
            <div>
              <p>Root Path</p>
              <Link to="/test">/test</Link>
            </div>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state};
};

export default connect(mapStateToProps)(Main);
