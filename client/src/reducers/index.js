import { combineReducers } from 'redux';
import user from './user';
import chat from './chat';
import modal from './modal';
import contacts from './contacts';

const rootReducer = combineReducers({ user, modal, contacts });

export default rootReducer;
