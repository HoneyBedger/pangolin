import actionTypes from '../actions/actionTypes';

const initialState = { modalType: null, modalProps: {} };

const modal = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        modalType: action.payload.modalType,
        modalProps: action.payload.modalProps
      };
    case actionTypes.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modal;
