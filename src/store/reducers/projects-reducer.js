import ActionTypes from '../types';

const initialState = {
  all: [],
  current: {},
  error: '',
};

const ProjectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTS:
      return { all: action.payload, current: state.current, error: state.error };
    case ActionTypes.FETCH_PROJECT:
      return { all: state.all, current: action.payload, error: state.error };
    case ActionTypes.NEW_PROJECT:
      return { all: [...state.all, action.payload], current: action.payload, error: state.error };
    case ActionTypes.ERROR_SET:
      return { all: state.all, current: state.current, error: action.error };
    default:
      return state;
  }
};

export default ProjectsReducer;
