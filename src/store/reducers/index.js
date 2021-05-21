import { combineReducers } from 'redux';

import postsReducer from './posts-reducer';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
