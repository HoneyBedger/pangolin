import socketIO from 'socket.io-client';
import socketActionTypes from './actions/socketActionTypes';
import { userLoading } from './actions/actionCreators';

let socket;

// Connect to the WebSocket server, dispatch socket events as Redux actions
export const connectToSocket = (store) => {
  store.dispatch(userLoading());

  let token = ( store.user && store.user.user && store.user.user.token )
    || window.localStorage.getItem('userToken');
  let username = ( store.user && store.user.user && store.user.user.username )
    || window.localStorage.getItem('username');
  socket = socketIO('/', {
    autoConnect: false,
    transportOptions: {
    polling: {
      extraHeaders: {
        'token': token,
        'username': username
      }
    }
  }
  });

  Object.values(socketActionTypes).forEach(type => socket.on(type, (payload) => {
    store.dispatch({
      type,
      payload
    });
  }));


  socket.open();
};

export const emit = (type, payload, callback) => socket.emit(type, payload, callback);
