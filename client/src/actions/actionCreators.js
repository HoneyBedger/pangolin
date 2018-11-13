import actionTypes from './actionTypes';
import socketActionTypes from './socketActionTypes';
import { connectToSocket } from '../socketClient';

//===MODAL===//
export const showModal = (modalType, modalProps) => {
  return {
    type: actionTypes.SHOW_MODAL,
    payload: { modalType, modalProps }
  };
};

export const hideModal = () => {
  return {
    type: actionTypes.HIDE_MODAL
  };
};

//===CONTACTS===//
export const searchExistingContacts = (searchString) => {
  return {
    type: actionTypes.SEARCH_EXISTING_CONTACTS,
    payload: searchString
  };
};

export const searchContactsInModal = (searchString) => {
  return {
    type: actionTypes.SEARCH_CONTACTS_IN_MODAL,
    payload: searchString
  };
};

export const searchContacts = (searchString, token) => (dispatch) => {
  console.log('searching contacts with token', token);
  dispatch(contactsLoading());
  return fetch(`/users?search=${searchString}`, {
    headers: { 'Authorization': 'Bearer ' + String(token)}
  }).then(res => {
    if (!res.ok) {
      res.text().then(err => dispatch(contactsLoadingFailed(err)));
    } else {
      res.json().then(contacts => dispatch(contactsLoadingSuccess(contacts)));
    }
  }).catch(err => dispatch(contactsLoadingFailed(err.message)));
};

export const addContact = (contact, token) => (dispatch, getState, emit) => {
  dispatch(addContactLocally(contact));
  emit('ADD_CONTACT', { usernameToAdd: contact.username, token});
};

export const contactsLoading = () => {
  return {
    type: actionTypes.CONTACTS_LOADING
  };
};

export const contactsLoadingSuccess = (contacts) => {
  console.log("contacts loaded:", contacts);
  return {
    type: actionTypes.CONTACTS_LOADING_SUCCESS,
    payload: contacts
  };
};

export const contactsLoadingFailed = (errMessage) => {
  console.log("contacts loading failed:", errMessage);
  return {
    type: actionTypes.CONTACTS_LOADING_FAILED,
    payload: errMessage
  };
};

export const clearContactSearch = () => {
  return {
    type: actionTypes.CLEAR_CONTACT_SEARCH
  };
};

export const addContactLocally = (contact) => {
  return {
    type: actionTypes.ADD_CONTACT_LOCALLY,
    payload: contact
  };
};

export const selectContact = (id) =>  {
  return {
    type: actionTypes.SELECT_CONTACT,
    payload: id
  };
};


//===CHAT===//
export const sendFirstMessage = (users, content, token) => (dispatch, getState, emit) => {
  console.log('sending first message');
  emit('FIRST_MESSAGE', { users, content, token });
};

export const sendMessage = (chatId, content, token) => (dispatch, getState, emit) => {
  emit('MESSAGE', { chatId, content, token })
};

export const addPersonToChat = (chatId, userId, token) => (dispatch, getState, emit) => {
  emit('ADD_PERSON_TO_CHAT', { chatId, userId, token });
};

export const searchExistingChats = (searchString, contacts) => {
  return {
    type: actionTypes.SEARCH_EXISTING_CHATS,
    payload: { searchString, contacts }
  };
};

export const selectChat = (id) =>  {
  return {
    type: actionTypes.SELECT_CHAT,
    payload: id
  };
};


//===USER===//
export const fetchUser = (username, password) => (dispatch) => {
  console.log("fetching user");
  dispatch(userLoading());
  return fetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    res.json()
    .then(resObj => {
      if (resObj.err) {
        console.log(resObj.err);
        dispatch(userLoadingFailed(resObj.err));
        return;
      }
      window.localStorage.setItem('userToken', String(resObj.user.token));
      window.localStorage.setItem('username', String(resObj.user.username));
      dispatch(userLoadingSuccess(resObj.user));
    }).catch(err => {
      if (res.status === 401)
        dispatch(userLoadingFailed('Looks like your username and/or password are incorrect.'));
      else dispatch(userLoadingFailed(res.statusText));
    });
  }).catch(err => dispatch(userLoadingFailed(err.message)));
};

export const registerUser = (username, password, name) => (dispatch) => {
  console.log("registering user");
  dispatch(userRegistering());
  return fetch('/users/register', {
    method: 'POST',
    body: JSON.stringify({ username, password, name }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    res.json()
    .then(resObj => {
      if (resObj.err) {
        console.log(resObj.err);
        dispatch(userRegisteringFailed(resObj.err));
        return;
      }
      window.localStorage.setItem('userToken', String(resObj.user.token));
      window.localStorage.setItem('username', String(resObj.user.username));
      dispatch(userRegisteringSuccess(resObj.user));
    }).catch(err => dispatch(userRegisteringFailed(res.statusText)));
  }).catch(err => dispatch(userRegisteringFailed(err.message)));
};

export const userLoading = () => {
  return {
    type: actionTypes.USER_LOADING
  };
};

export const userLoadingSuccess = (user) => {
  console.log("user loaded:", user);
  return {
    type: actionTypes.USER_LOADING_SUCCESS,
    payload: user
  };
};

export const userLoadingFailed = (errMessage) => {
  console.log("user loading failed:", errMessage);
  return {
    type: actionTypes.USER_LOADING_FAILED,
    payload: errMessage
  };
};

export const userRegistering = () => {
  return {
    type: actionTypes.USER_REGISTERING
  };
};

export const userRegisteringSuccess = (user) => {
  console.log("user loaded:", user);
  return {
    type: actionTypes.USER_REGISTERING_SUCCESS,
    payload: user
  };
};

export const userRegisteringFailed = (errMessage) => {
  console.log("user loading failed:", errMessage);
  return {
    type: actionTypes.USER_REGISTERING_FAILED,
    payload: errMessage
  };
};

export const logout = () => (dispatch, getState, emit) => {
  console.log('logging out');
  emit('LOGOUT');
  window.localStorage.removeItem('username');
  window.localStorage.removeItem('userToken');
  dispatch(logoutLocally());
};

export const logoutLocally = () => {
  return {
    type: actionTypes.LOGOUT_LOCALLY
  };
}

//===PROFILE UPDATES===//
export const uploadPicture = (picture, type, token) => (dispatch, getState, emit) => {
  console.log('uploading picture');
  dispatch(uploadPictureInprogress());
  const fr = new FileReader();
  fr.onload = () => {
    let data = fr.result;
    emit('UPLOAD_PICTURE', { picture: data, type, token });
  };
  fr.readAsArrayBuffer(picture);
};

export const uploadPictureWarning = (message) => {
  return {
    type: actionTypes.UPLOAD_PICTURE_WARNING,
    payload: message
  };
};

export const uploadPictureInprogress = () => {
  return {
    type: actionTypes.UPLOAD_PICTURE_INPROGRESS
  };
};

export const changeName = (name, token) => (dispatch, getState, emit) => {
  dispatch(changeNameInprogress());
  emit('CHANGE_NAME', { name, token });
};

export const changeNameInprogress = () => {
  return {
    type: actionTypes.CHANGE_NAME_INPROGRESS
  };
};
