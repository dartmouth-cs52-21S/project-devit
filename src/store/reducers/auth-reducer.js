import ActionTypes from '../types';

const initialState = {
  authenticated: false,
  user: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true, user: action.payload };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false, user: {} };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, user: state.user };
    default:
      return state;
  }
};

export default AuthReducer;
