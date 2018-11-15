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
  keys: ['namesForSearch.name', 'namesForSearch.username'],
  shouldSort: true,
  threshold: 0.3,
  maxPatternLength: 32,
  minMatchCharLength: 2
};

const chats = (state = initialState, action) => {
  switch (action.type) {
    case socketActionTypes.CONNECTION_TO_SOCKET_SUCCESS: {
      let chats = action.payload.chats;
      return { ...state, chats, userId: action.payload.user._id };
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
          _id: (new Date()).getTime(), // just a temporary one, will be replaced once saved to DB
          users: [].concat([action.payload, state.userId]),
          messages: []
        };
        return { ...state, chats: state.chats.concat(newChat), selectedChatId: newChat._id };
      }
    case socketActionTypes.FIRST_MESSAGE_SUCCESS: {
      let chatExists = false;
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload.oldId) {
          chatExists = true;
          return action.payload.chat;
        }
        else return chat;
      });
      if (!chatExists) newChats.push(action.payload.chat);
      return { ...state, chats: newChats,
        selectedChatId: state.selectedChatId === action.payload.oldId ? action.payload.chat._id : state.selectedChatId };
    }
    case socketActionTypes.FIRST_MESSAGE_FAILED:
      return state;
    case socketActionTypes.MESSAGE_SUCCESS: {
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload.chatId)
          return { ...chat, messages: chat.messages.concat(action.payload.message),
            numUnseenMsgs: state.selectedChatId === chat._id ? 0 : chat.numUnseenMsgs + 1 };
        else return chat;
      });
      return { ...state, chats: newChats };
    }
    case socketActionTypes.MESSAGE_FAILED:
      return state;
    case actionTypes.ADD_PERSON_TO_CHAT_LOCALLY: {
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload.chatId)
          return {
            ...chat,
            users: chat.users.concat(action.payload.userId)
          };
        else return chat;
      });
      return { ...state, chats: newChats };
    }
    case socketActionTypes.ADD_PERSON_TO_CHAT_SUCCESS: {
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload.chatId)
          return { ...chat, users: chat.users.concat(action.payload.userId) };
        else return chat;
      });
      return { ...state, chats: newChats };
    }
    case socketActionTypes.ADD_PERSON_TO_CHAT_FAILED:
      return state;
    case actionTypes.SEARCH_EXISTING_CHATS: {
      let chats = state.beforeSearch
        ? state.beforeSearch
        : state.chats.map(chat => {
            let namesForSearch = action.payload.contacts.filter(c => chat.users.includes(c._id))
              .map(c => ({ name: c.name, username: c.username }));
            return { ...chat, namesForSearch };
          });
      if (action.payload.searchString.length >= 2 && action.payload.searchString.length <= 32) {
        const fuse = new Fuse(chats, searchOptions);
        return { ...state, chats: fuse.search(action.payload.searchString), beforeSearch: chats };
      } else {
        return { ...state, chats, beforeSearch: null };
      }
    }
    case actionTypes.SELECT_CHAT:
      return { ...state, selectedChatId: action.payload };
    case actionTypes.RESET_UNSEEN_MESSAGES_LOCALLY: {
      let newChats = state.chats.map(chat => {
        if (chat._id === action.payload) return { ...chat, numUnseenMsgs: 0 };
        else return chat;
      });
      return { ...state, chats: newChats };
    }
    default:
      return state;
  }
};

export default chats;
