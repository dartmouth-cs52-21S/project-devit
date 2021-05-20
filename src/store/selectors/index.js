// Posts Reducer
export const selectAllPosts = (state) => state.posts.all;
export const selectCurrentPost = (state) => state.posts.current;
export const selectError = (state) => state.posts.error;

// Auth Reducer
export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectUser = (state) => state.auth.user;
