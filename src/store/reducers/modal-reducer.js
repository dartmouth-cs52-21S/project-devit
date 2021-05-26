import ActionTypes from '../types';

const initialState = {
  modalContent: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL_VISIBILITY: {
      return {
        ...state,
        modalContent: action.modalContent,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
