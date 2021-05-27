import { combineReducers } from 'redux';

import ProjectsReducer from './projects-reducer';
import AuthReducer from './auth-reducer';
import SidebarReducer from './sidebar-reducer';
import ModalReducer from './modal-reducer';

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  auth: AuthReducer,
  sidebar: SidebarReducer,
  modal: ModalReducer,
});

export default rootReducer;
