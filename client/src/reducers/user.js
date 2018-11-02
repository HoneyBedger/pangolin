import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const user = (
  state = { isLoading: false, errMessage: null, user: {} },
  action
) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return { ...state, isLoading: true, errMessage: null, user: {} };
    case actionTypes.USER_LOADING_SUCCESS:
      return { ...state, isLoading: false, errMessage: null, user: action.payload };
    case actionTypes.USER_LOADING_FAILED:
      return { ...state, isLoading: false, errMessage: action.payload, user: {} };
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS:
      return { ...state, isLoading: false, errMessage: null, user: action.payload };
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return { ...state, isLoading: false, errMessage: action.payload, user: {} };
    case socketActionTypes.SOCKET_ERROR:
      let errMessage = (action.payload.includes('Token') ||
        action.payload.includes('token') ||
        action.payload.includes('NotBefore'))
        ? 'There was a problem with your authentication token. Please log in again.'
        : 'Something went wrong on the server. Please log in and try agan.';
      return { ...state, isLoading: false, errMessage, user: {} };
    default:
      return state;
  }
};

export default user;
