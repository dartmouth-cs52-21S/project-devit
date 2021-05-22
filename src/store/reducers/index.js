import { combineReducers } from 'redux';

import projectsReducer from './projects-reducer';
import authReducer from './auth-reducer';
import sidebarReducer from './sidebar-reducer';

const rootReducer = combineReducers({
  posts: projectsReducer,
  auth: authReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;