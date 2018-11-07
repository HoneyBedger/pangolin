import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = [];

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS:
      return action.payload.contacts;
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return initialState;
    case actionTypes.ADD_CONTACT_LOCALLY:
      return state.concat(action.payload);
    case socketActionTypes.NEW_CONTACT:
      return state.concat({ ...action.payload, new: true });
    case socketActionTypes.CONTACT_ONLINE:
      return state.filter(contact => contact.username !== action.payload)
        .concat(state.filter(contact => contact.username === action.payload)
          .map(contact => ({ ...contact, online: true })));
    case socketActionTypes.CONTACT_OFFLINE:
      return state.filter(contact => contact.username !== action.payload)
        .concat(state.filter(contact => contact.username === action.payload)
          .map(contact => ({ ...contact, online: false })));
    case actionTypes.LOGOUT_LOCALLY:
      return initialState;
    default:
      return state;
  }
};

export default contacts;
