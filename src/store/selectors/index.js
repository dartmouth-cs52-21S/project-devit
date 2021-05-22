// Projects Reducer
export const selectAllProjects = (state) => state.posts.all;
export const selectCurrentProject = (state) => state.posts.current;
export const selectError = (state) => state.posts.error;

// Auth Reducer
export const selectisAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;

// Sidebar Reducer
export const selectSidebarIsCollapsed = (state) => state.sidebar.isCollapsed;
