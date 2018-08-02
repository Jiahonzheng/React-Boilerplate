import React from "react";
import {connect} from "react-redux";
import {Route, Link, Switch, withRouter} from "react-router-dom";
import Test from "../Test/Test";

import "../../test.css";

class Header extends React.Component {
  render() {
    return (
      <div>
        Header
        <Link to="/">Index</Link>
        <Link to="/test">Test</Link>
      </div>
    );
  }
}

class Main extends React.Component {
  renderTest() {
    return <Test />;
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Index</div>} />
          <Route path="/test" component={this.renderTest} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {...state};
};

export default withRouter(connect(mapStateToProps)(Main));
