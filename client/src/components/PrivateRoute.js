import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { authenticateWithToken } from '../actions/actionCreators';

const mapStateToProps = (state) => {
  return {
    tokenIsValid: state.user.user && state.user.user.tokenIsValid,
    errMessage: state.user.errMessage
  };
};


const PrivateRoute = ({
  component: Component,
  connectToSocket,
  tokenIsValid,
  errMessage,
  ...rest }) => {

  // If the page was reloaded but user was logged in, recover
  if (!tokenIsValid && !errMessage && window.localStorage.getItem('userToken'))
    connectToSocket();
  // if there is an error message, then we already tried to connect
  // but the token was bad. If there's no token in localStorage then we didn't
  // log in yet

  return (
    <Route render={() => {
      if (tokenIsValid) {
        return <Component {...rest} />;
      } else {
        return (
          <Redirect to='/login' />
        );
      }
    }}/>
  );
}

export default connect(mapStateToProps)(PrivateRoute);
