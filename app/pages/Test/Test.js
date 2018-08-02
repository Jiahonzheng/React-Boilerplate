import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import testActionCreator from "./TestActions";

import "../../test.css";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.onFetchButtonPressed = this.onFetchButtonPressed.bind(this);
    this.onClearButtonPressed = this.onClearButtonPressed.bind(this);

    this.state = {
      message: undefined
    };
  }

  onFetchButtonPressed() {
    this.props.testAction.fetchTestData();
  }

  onClearButtonPressed() {
    this.props.testAction.clear();
  }

  render() {
    return (
      <div>
        Message: {this.props.testReducer.message || "Press FETCH"}
        <br />
        <button onClick={this.onFetchButtonPressed}>FETCH</button>
        <button onClick={this.onClearButtonPressed}>CLEAR</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {testReducer} = state;

  return {
    testReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  const testAction = bindActionCreators(testActionCreator, dispatch);

  return {
    testAction
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test);
