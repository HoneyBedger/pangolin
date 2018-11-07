import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';
import chat from './chat';
import modal from './modal';
import searchContacts from './searchContacts';

const rootReducer = combineReducers({ user, contacts, modal, searchContacts });

export default rootReducer;
