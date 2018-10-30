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

class Login extends Component {

  render() {
    return (
      <div>
        The login page!
        <form onSubmit={(e) => {
            console.log("submitting refistration form");
            e.preventDefault();
            this.props.register(this.username.value, this.password.value, this.name.value);
          }}>
          <input type="email" name="username" placeholder="Email"
            ref={(input) => {this.username = input}} />
          <input type="password" name="password" placeholder="Password"
            ref={(input) => {this.password = input}} />
          <input type="text" name="name" placeholder="Name"
            ref={(input) => {this.name = input}} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
