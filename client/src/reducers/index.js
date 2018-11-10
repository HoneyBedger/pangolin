import { combineReducers } from 'redux';
import user from './user';
import contacts from './contacts';
import chats from './chats';
import modal from './modal';
import searchContacts from './searchContacts';

const rootReducer = combineReducers({ user, contacts, chats, modal, searchContacts });

export default rootReducer;
