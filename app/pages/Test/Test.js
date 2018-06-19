import React from "react";
import {bindActionCreators} from "redux"
import {connect} from "react-redux";
import testActionCreator from "../Test/TestActions";

class Test extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {testAction} = this.props;
    testAction.fetchTestData()
  }

  render() {
    return <div>Hello</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Test);
