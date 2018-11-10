import Fuse from 'fuse.js';
import actionTypes from '../actions/actionTypes';
import socketActionTypes from '../actions/socketActionTypes';

const initialState = {
  userId: null,
  chats: [],
  beforeSearch: null,
  selectedChatId: null
};

const searchOptions = {
  keys: ['name', 'username'], //!?
  shouldSort: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 2
};

const chats = (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS: {
      let chats = action.payload.chats;
      return { ...state, chats, userId: action.payload.user._id,
        selectedChatId: (chats.length > 0 ? chats[0]._id : null)};
    }
    case socketActionTypes.CONNECTION_TO_SOCKET_FAILED:
      return initialState;
    case actionTypes.SELECT_CONTACT:
      let existingChat = state.chats.filter(chat => {
        return (chat.users.length === 2 && chat.users.includes(action.payload));
      });
      if (existingChat[0]) return { ...state, selectedChatId: existingChat[0]._id };
      else { // create a new chat
        let newChat = {
          _id: `${action.payload} ${state.userId}`, // just a temporary one, will be replaced once saved to DB
          users: [].concat([action.payload, state.userId]),
          messages: []
        };
        return { ...state, chats: state.chats.concat(newChat), selectedChatId: newChat._id };
      }
    case socketActionTypes.FIRST_MESSAGE_SUCCESS: {
      let chatsToKeep = [], replacedChatId;
      state.chats.forEach(chat => {
        let chatIsReplaced = true;
        for (let id of action.payload.users) {
          if (!chat._id.includes(id)) {
            chatsToKeep.push(chat);
            chatIsReplaced = false;
            break;
          }
        }
        if (chatIsReplaced) replacedChatId = chat._id;
      });
      let newChat = action.payload;
      return { ...state, chats: chatsToKeep.concat(newChat),
        selectedChatId: state.selectedChatId === replacedChatId ? action.payload._id : state.selectedChatId };
    }
    case socketActionTypes.FIRST_MESSAGE_FAILED:
      return state;
    case socketActionTypes.MESSAGE_SUCCESS: {
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload._id) return action.payload;
        else return chat;
      });
      return { ...state, chats: newChats };
    }
    case socketActionTypes.MESSAGE_FAILED:
      return state;
    default:
      return state;
  }
};

export default chats;
