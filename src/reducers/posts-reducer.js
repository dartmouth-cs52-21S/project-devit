import { ActionTypes } from '../actions';

const PostsReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return state.posts;
    case ActionTypes.FETCH_POST:
      return state.posts.id;
    default:
      return state;
  }
};

export default PostsReducer;
