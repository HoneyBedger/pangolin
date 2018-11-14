const actionTypes = {
  USER_LOADING: 'USER_LOADING',
  USER_LOADING_SUCCESS: 'USER_LOADING_SUCCESS',
  USER_LOADING_FAILED: 'USER_LOADING_FAILED',

  USER_REGISTERING: 'USER_REGISTERING',
  USER_REGISTERING_SUCCESS: 'USER_REGISTERING_SUCCESS',
  USER_REGISTERING_FAILED: 'USER_REGISTERING_FAILED',

  LOGOUT_LOCALLY: 'LOGOUT_LOCALLY',

  CONTACTS_LOADING: 'CONTACTS_LOADING',
  CONTACTS_LOADING_SUCCESS: 'CONTACTS_LOADING_SUCCESS',
  CONTACTS_LOADING_FAILED: 'CONTACTS_LOADING_FAILED',
  CLEAR_CONTACT_SEARCH: 'CLEAR_CONTACT_SEARCH',
  ADD_CONTACT_LOCALLY: 'ADD_CONTACT_LOCALLY',
  ADD_PERSON_TO_CHAT_LOCALLY: 'ADD_PERSON_TO_CHAT_LOCALLY',
  SELECT_CONTACT: 'SELECT_CONTACT',
  SELECT_CHAT: 'SELECT_CHAT',

  SEARCH_EXISTING_CONTACTS: 'SEARCH_EXISTING_CONTACTS',
  SEARCH_CONTACTS_IN_MODAL: 'SEARCH_CONTACTS_IN_MODAL',
  SEARCH_EXISTING_CHATS: 'SEARCH_EXISTING_CHATS',

  UPLOAD_PICTURE_WARNING: 'UPLOAD_PICTURE_WARNING',
  UPLOAD_PICTURE_INPROGRESS: 'UPLOAD_PICTURE_INPROGRESS',
  CHANGE_NAME_INPROGRESS: 'CHANGE_NAME_INPROGRESS',

  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL'
};

export default actionTypes;
