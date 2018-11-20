import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './user';
import contacts from './contacts';
import chats from './chats';
import modal from './modal';
import searchContacts from './searchContacts';
import smallDeviceDisplay from './smallDeviceDisplay';

const allReducers = combineReducers({
  user,
  contacts,
  chats,
  modal,
  searchContacts,
  form: formReducer,
  smallDeviceDisplay
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_LOCALLY') 
    state = undefined;

  return allReducers(state, action);
}

export default rootReducer;
