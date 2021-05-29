import ActionTypes from '../types';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');
const parsedUser = JSON.parse(storedUser);

const hasAuthCredentials = storedToken && storedUser;

const initialState = {
  isAuthenticated: hasAuthCredentials,
  user: parsedUser ?? {},
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
