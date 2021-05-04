import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { all: action.payload, current: state.current };
    case ActionTypes.FETCH_POST:
      return { all: [...state.current, action.payload], current: action.payload };
    case ActionTypes.DELETE_POST:
      return { all: action.payload, current: state.current };
    default:
      return state;
  }
};

export default PostsReducer;
