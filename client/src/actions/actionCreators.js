import actionTypes from './actionTypes';
import socketActionTypes from './socketActionTypes';
import { connectToSocket } from '../socketClient';


export const signupAndLogin = (username, password) => {
  return {
    type: actionTypes.SIGNUP_AND_LOGIN,
    payload: {username, password}
  };
};


//===USER===//
export const fetchUser = (username, password) => (dispatch) => {
  console.log("fetching user");
  dispatch(userLoading());
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    res.json()
    .then(resObj => {
      if (resObj.err) {
        console.log(resObj.err);
        dispatch(userLoadingFailed(resObj.err));
        return;
      }
      window.localStorage.setItem('userToken', String(resObj.user.token));
      window.localStorage.setItem('username', String(resObj.user.username));
      dispatch(userLoadingSuccess(resObj.user));
    }).catch(err => {
      if (res.status === 401)
        dispatch(userLoadingFailed('Looks like your username and/or password are incorrect.'));
      else dispatch(userLoadingFailed(res.statusText));
    });
  }).catch(err => dispatch(userLoadingFailed(err.message)));
};

export const registerUser = (username, password, name) => (dispatch) => {
  console.log("registering user");
  dispatch(userRegistering());
  return fetch('/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, name }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    res.json()
    .then(resObj => {
      if (resObj.err) {
        console.log(resObj.err);
        dispatch(userRegisteringFailed(resObj.err));
        return;
      }
      window.localStorage.setItem('userToken', String(resObj.user.token));
      window.localStorage.setItem('username', String(resObj.user.username));
      dispatch(userRegisteringSuccess(resObj.user));
    }).catch(err => dispatch(userRegisteringFailed(res.statusText)));
  }).catch(err => dispatch(userRegisteringFailed(err.message)));
};

export const userLoading = () => {
  return {
    type: actionTypes.USER_LOADING
  };
};

export const userLoadingSuccess = (user) => {
  console.log("user loaded:", user);
  return {
    type: actionTypes.USER_LOADING_SUCCESS,
    payload: user
  };
};

export const userLoadingFailed = (errMessage) => {
  console.log("user loading failed:", errMessage);
  return {
    type: actionTypes.USER_LOADING_FAILED,
    payload: errMessage
  };
};

export const userRegistering = () => {
  return {
    type: actionTypes.USER_REGISTERING
  };
};

export const userRegisteringSuccess = (user) => {
  console.log("user loaded:", user);
  return {
    type: actionTypes.USER_REGISTERING_SUCCESS,
    payload: user
  };
};

export const userRegisteringFailed = (errMessage) => {
  console.log("user loading failed:", errMessage);
  return {
    type: actionTypes.USER_REGISTERING_FAILED,
    payload: errMessage
  };
};
