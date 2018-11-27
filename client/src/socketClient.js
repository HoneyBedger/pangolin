import socketIO from 'socket.io-client';
import socketActionTypes from './actions/socketActionTypes';
import { userLoading } from './actions/actionCreators';

let socket;

export const connectToSocket = (store) => {
  store.dispatch(userLoading());

  let token = ( store.user && store.user.user && store.user.user.token )
    || window.localStorage.getItem('userToken');
  let username = ( store.user && store.user.user && store.user.user.username )
    || window.localStorage.getItem('username');
  console.log('connecting to WebSocket with token = ', token);
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
    console.log("webSocket received ", type, ' with payload', payload);
    store.dispatch({
      type,
      payload
    });
  }));

  const logout = (username, cb) => {
    socket.emit('logout', username, cb);
  };

  const message = (fromUsername, toUsernames, content, cb) => {
    socket.emit('message', fromUsername, toUsernames, content, cb);
  };

  socket.open();
};

export const emit = (type, payload, callback) => socket.emit(type, payload, callback);
