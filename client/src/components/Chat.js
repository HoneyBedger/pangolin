import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

class Chat extends Component {

  render() {
    return (
      <div>
        The chat!
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
