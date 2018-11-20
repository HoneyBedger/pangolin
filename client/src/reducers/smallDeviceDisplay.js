import actionTypes from '../actions/actionTypes';

const initialState = { showAvailableChats: false, showContacts: false };

const smallDeviceDisplay = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.TOGGLE_AVAILABLE_CHATS:
      return { ...state, showAvailableChats: !state.showAvailableChats };
    case actionTypes.TOGGLE_CONTACTS:
      return { ...state, showContacts: !state.showContacts };
    default:
      return state;
  };
};

export default smallDeviceDisplay;
