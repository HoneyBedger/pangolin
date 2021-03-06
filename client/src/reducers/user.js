import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = {
  isLoading: false,
  loginErrMessage: null,
  registerErrMessage: null,
  socketErrMessage: null,
  pictureWarning: null,
  pictureErrMessage: null,
  pictureIsLoading: false,
  nameIsLoading: false,
  nameErrMessage: null,
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
      let { _id, username, name, picture, token, tokenIsValid } = action.payload.user;
      return { ...state, isLoading: false, socketErrMessage: null,
        user: { _id, username, name, picture, token, tokenIsValid } };
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return { ...state, isLoading: false, socketErrMessage: action.payload, user: {} };
    case socketActionTypes.SOCKET_ERROR:
      let errMessage = (action.payload.message.includes('Token') ||
        action.payload.message.includes('token') ||
        action.payload.message.includes('NotBefore'))
        ? 'There was a problem with your authentication token. Please log in again.'
        : 'Something went wrong on the server. Please log in and try agan.';
      return { ...state, isLoading: false, socketErrMessage: errMessage, user: {} };
    case socketActionTypes.ERROR: {
      let errMessage =  !action.payload.message && action.payload.includes('jwt expired')
        ? 'Your session has expired. Please log in again.' : action.payload.message;
      return { ...state, isLoading: false, socketErrMessage: errMessage, user: {} };
    }
    case socketActionTypes.JWT_EXPIRED:
      return { ...state, socketErrMessage: 'Your session has expired. Please log in again.', user: {} };
    case actionTypes.UPLOAD_PICTURE_WARNING:
      return { ...state, pictureWarning: action.payload };
    case actionTypes.UPLOAD_PICTURE_INPROGRESS:
      return { ...state, pictureIsLoading: true, pictureWarning: null, pictureErrMessage: null };
    case socketActionTypes.UPLOAD_PICTURE_SUCCESS:
      return { ...state, user: { ...state.user, picture: action.payload }, pictureIsLoading: false };
    case socketActionTypes.UPLOAD_PICTURE_FAILED:
      return { ...state, pictureIsLoading: false, pictureErrMessage: action.payload };
    case actionTypes.CHANGE_NAME_INPROGRESS:
      return { ...state, nameIsLoading: true, nameErrMessage: null };
    case socketActionTypes.CHANGE_NAME_SUCCESS:
      return { ...state, user: { ...state.user, name: action.payload }, nameIsLoading: false };
    case socketActionTypes.CHANGE_NAME_FAILED:
      return { ...state, nameIsLoading: false, nameErrMessage: action.payload };

    default:
      return state;
  }
};

export default user;
