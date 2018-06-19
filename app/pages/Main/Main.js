import React from "react";
import {connect} from "react-redux";
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Test from "../Test/Test";

class Main extends React.Component {
  render() {
    return <Test {...this.props} />;
  }
}

const mapStateToProps = (state) => {
  return {...state};
};

export default connect(mapStateToProps)(Main);
