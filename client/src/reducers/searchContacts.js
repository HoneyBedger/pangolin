import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  errMessage: null,
  contacts: null
};

const searchContacts = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONTACTS_LOADING:
      return { ...state, isLoading: true, errMessage: null, contacts: null };
    case actionTypes.CONTACTS_LOADING_SUCCESS:
      return { ...state, isLoading: false, errMessage: null, contacts: action.payload };
    case actionTypes.CONTACTS_LOADING_FAILED:
      return { ...state, isLoading: false, errMessage: action.payload, contacts: null };
    case actionTypes.CLEAR_CONTACT_SEARCH:
      return initialState;
    default:
      return state;
  }
};

export default searchContacts;
