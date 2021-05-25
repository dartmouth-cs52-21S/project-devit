// Projects Reducer
export const selectAllProjects = (state) => state.projects.all;
export const selectCurrentProject = (state) => state.projects.current;
export const selectError = (state) => state.projects.error;

// Auth Reducer
export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectUserIsDefined = (state) => Object.keys(state.auth.user).length > 0;

// Sidebar Reducer
export const selectSidebarIsCollapsed = (state) => state.sidebar.isCollapsed;
