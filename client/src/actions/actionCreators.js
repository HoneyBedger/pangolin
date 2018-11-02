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
    body: JSON.stringify({username, password}),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    if (res.err) throw new Error(res.err);
    else if (!res.ok) {
      if (res.status === 401) throw new Error('Looks like your username and/or password are incorrect.');
      else if (res.status === 500 || res.status === 404) throw new Error('Oh no! Something is wrong with our server. Please try again later.');
      else throw new Error(res.status + ': ' + res.statusText);
    } else return res;
  }).then(res => res.json())
  .then(res => {
    window.localStorage.setItem('userToken', String(res.user.token));
    window.localStorage.setItem('username', String(res.user.username));
    dispatch(userLoadingSuccess(res.user));
  })
  .catch(err => dispatch(userLoadingFailed(err.message)));
};

export const authenticateWithToken = (token) => (dispatch) => {
  console.log("authenticating with a token:", token);

  return dispatch(userLoadingFailed('message here'));
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
