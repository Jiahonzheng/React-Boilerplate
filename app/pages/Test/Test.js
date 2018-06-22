import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import testActionCreator from "../Test/TestActions";

class Test extends React.Component {
  constructor(props) {
    super(props);

    this.onFetchButtonPressed = this.onFetchButtonPressed.bind(this);
    this.onClearButtonPressed = this.onClearButtonPressed.bind(this);

    this.state = {
      message: undefined
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(props) {
    if (this.state.message) {
      return this.setState({
        message: undefined
      });
    }

    if (props.testReducer.message !== this.state.message) {
      return setTimeout(
        () =>
          this.setState({
            message: props.testReducer.message
          }),
        1000
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.testReducer.message === this.state.message) {
      return false;
    }

    return true;
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
        Message: {this.state.message || "Press FETCH"}
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
