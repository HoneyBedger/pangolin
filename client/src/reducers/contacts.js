import Fuse from 'fuse.js';
import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = { contacts: [], beforeSearch: null};

const searchOptions = {
  keys: ['name', 'username'],
  shouldSort: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 2
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS:
      return { ...state, contacts: action.payload.contacts };
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return initialState;
    case actionTypes.ADD_CONTACT_LOCALLY:
      return { ...state, contacts: state.concat(action.payload) };
    case socketActionTypes.NEW_CONTACT:
      return { ...state, contacts: state.concat({ ...action.payload, new: true }) };
    case socketActionTypes.CONTACT_ONLINE: {
      let newContacts = [].concat(state.contacts);
      newContacts.forEach(c => {
        if (c.username === action.payload) c.online  = true;
      });
      return { ...state, contacts: newContacts };
    }
    case socketActionTypes.CONTACT_OFFLINE: {
      let newContacts = [].concat(state.contacts);
      newContacts.forEach(c => {
        if (c.username === action.payload) c.online  = false;
      });
      return { ...state, contacts: newContacts };
    }
    case actionTypes.SEARCH_EXISTING_CONTACTS:
      console.log('beforeSearch is', state.beforeSearch);
      let contacts = state.beforeSearch ? state.beforeSearch : state.contacts;
      if (action.payload.length >= 2 && action.payload.length <= 32) {
        const fuse = new Fuse(contacts, searchOptions);
        return { contacts: fuse.search(action.payload), beforeSearch: contacts};
      } else {
        return { contacts, beforeSearch: null };
      }
    case actionTypes.LOGOUT_LOCALLY:
      return initialState;
    default:
      return state;
  }
};

export default contacts;
