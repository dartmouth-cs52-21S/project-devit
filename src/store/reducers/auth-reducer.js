import ActionTypes from '../types';

const initialState = {
  isAuthenticated: false,
  user: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { isAuthenticated: true, user: action.payload };
    case ActionTypes.FETCH_PROJECTS_FOR_USER:
      return { ...state, user: { ...state.user, projects: action.payload } };
    case ActionTypes.DEAUTH_USER:
      return { isAuthenticated: false, user: {} };
    default:
      return state;
  }
};

export default AuthReducer;
