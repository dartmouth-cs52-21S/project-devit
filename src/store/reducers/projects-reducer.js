import ActionTypes from '../types';

const initialState = {
  all: [],
  current: {},
};

const ProjectsReducer = (state = initialState, action) => {
  console.log('type', action.type);
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTS:
      return { all: action.payload, current: state.current };
    case ActionTypes.FETCH_PROJECT:
      return { all: state.all, current: action.payload };
    case ActionTypes.NEW_PROJECT:
      return { all: [...state.all, action.payload], current: action.payload };
    default:
      return state;
  }
};

export default ProjectsReducer;
