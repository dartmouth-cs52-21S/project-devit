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

// Modal Reducer
export const selectModalContent = (state) => state.modal.modalContent;
export const selectModalContentExists = (state) => Object.keys(state.modal.modalContent).length > 0;

// Chat Reducer
export const selectChatMessages = (state) => state.chat.messages;
