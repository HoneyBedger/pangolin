import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = {
  isLoading: false,
  loginErrMessage: null,
  registerErrMessage: null,
  socketErrMessage: null,
  user: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOADING:
      return { ...state, isLoading: true, registerErrMessage: null, loginErrMessage: null, user: {} };
    case actionTypes.USER_LOADING_SUCCESS:
      return { ...state, isLoading: false, loginErrMessage: null, user: action.payload };
    case actionTypes.USER_LOADING_FAILED:
      return { ...state, isLoading: false, loginErrMessage: action.payload, user: {} };
    case actionTypes.USER_REGISTERING:
      return { ...state, isLoading: true, loginErrMessage: null, registerErrMessage: null, user: {} };
    case actionTypes.USER_REGISTERING_SUCCESS:
      return { ...state, isLoading: false, registerErrMessage: null, user: action.payload };
    case actionTypes.USER_REGISTERING_FAILED:
      return { ...state, isLoading: false, registerErrMessage: action.payload, user: {} };
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS:
      return { ...state, isLoading: false, socketErrMessage: null, user: action.payload };
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return { ...state, isLoading: false, socketErrMessage: action.payload, user: {} };
    case socketActionTypes.SOCKET_ERROR:
      console.log('SOCKET_ERROR payload', action.payload);
      let errMessage = (action.payload.includes('Token') ||
        action.payload.includes('token') ||
        action.payload.includes('NotBefore'))
        ? 'There was a problem with your authentication token. Please log in again.'
        : 'Something went wrong on the server. Please log in and try agan.';
      return { ...state, isLoading: false, socketErrMessage: errMessage, user: {} };
    case actionTypes.ADD_CONTACT_LOCALLY:
      let { contacts, ...rest } = state.user;
      contacts = contacts.concat(action.payload);
      return { ...state, user: { contacts, ...rest } };
    default:
      return state;
  }
};

export default user;
