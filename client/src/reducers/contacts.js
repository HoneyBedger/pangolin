import Fuse from 'fuse.js';
import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = {
  contacts: [],
  contactsInModal: [],
  beforeSearch: null,
  beforeSearchInModal: null,
  selectedContactId: null
};

const searchOptions = {
  keys: ['name', 'username'],
  shouldSort: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 2
};

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS: {
      let contacts = action.payload.user.contacts.map(c => {
        if (action.payload.user.newContacts.includes(c._id))
          return { ...c, new: true };
        else return c;
      });
      return { ...state, contacts, contactsInModal: contacts };
    }
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return initialState;
    case actionTypes.ADD_CONTACT_LOCALLY:
      return { ...state, contacts: state.contacts.concat(action.payload),
        contactsInModal: state.contactsInModal.concat(action.payload) };
    case socketActionTypes.NEW_CONTACT:
      return { ...state, contacts: state.contacts.concat({ ...action.payload, new: true }),
        contactsInModal: state.contactsInModal.concat(action.payload) };
    case socketActionTypes.CONTACT_UPDATE:
      let newContacts = [];
      for(let c of state.contacts) {
        if (c.username === action.payload.username)
          newContacts.push({ ...c, ...action.payload });
        else newContacts.push(c);
      }
      return { ...state, contacts: newContacts, contactsInModal: newContacts };
    case actionTypes.SEARCH_EXISTING_CONTACTS:
      let contacts = state.beforeSearch ? state.beforeSearch : state.contacts;
      if (action.payload.length >= 2 && action.payload.length <= 32) {
        const fuse = new Fuse(contacts, searchOptions);
        return { ...state, contacts: fuse.search(action.payload), beforeSearch: contacts};
      } else {
        return { ...state, contacts, beforeSearch: null };
      }
    case actionTypes.SEARCH_CONTACTS_IN_MODAL: {
      let contactsInModal = state.beforeSearchInModal ? state.beforeSearchInModal : state.contactsInModal;
      if (action.payload.length >= 2 && action.payload.length <= 32) {
        const fuse = new Fuse(contactsInModal, searchOptions);
        return { ...state, contactsInModal: fuse.search(action.payload), beforeSearchInModal: contactsInModal};
      } else {
        return { ...state, contactsInModal, beforeSearchInModal: null };
      }
    }
    case actionTypes.SELECT_CONTACT: {
      let selectedContact = state.contacts.filter(c => c._id === action.payload)[0];
      if (selectedContact.new) {
        return {
          ...state,
          contacts: state.contacts.map(c => {
            if (c._id === action.payload) return { ...c, new: false };
            else return c;
          }),
          selectedContactId: action.payload
      };
      } else return { ...state, selectedContactId: action.payload };
    }
    case actionTypes.LOGOUT_LOCALLY:
      return initialState;
    default:
      return state;
  }
};

export default contacts;
