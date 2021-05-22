import ActionTypes from '../types';

const initialState = {
  isCollapsed: false,
};

const SidebarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        isCollapsed: !state.isCollapsed,
      };

    default:
      return state;
  }
};

export default SidebarReducer;
