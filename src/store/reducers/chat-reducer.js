import ActionTypes from '../types';

const initialState = {
  messages: [],
};

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CHAT_MESSAGES: {
      return {
        ...state,
        messages: action.messages,
      };
    }

    case ActionTypes.ADD_CHAT_MESSAGE: {
      return {
        ...state,
        messages: [...state.messages, action.newMessage],
      };
    }

    default:
      return state;
  }
};

export default ChatReducer;
