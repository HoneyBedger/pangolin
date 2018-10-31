import socketIO from 'socket.io-client';
import config from './config'

export default function() {
  const socket = socketIO(config.serverHost, {
    query: { token: 'token' }
  });

  socket.on('error', function (err) {
    console.log('received socket error:', err);
  });

  const registerHandler = (onMessageReceived) => {
    socket.on('message', onMessageReceived);
  }

  const unregisterHandler = () => {
    socket.off('message');
  }

  const login = (username, password, cb) => {
    socket.emit('login', username, password, cb);
  };

  const logout = (username, cb) => {
    socket.emit('logout', username, cb);
  };

  const message = (fromUsername, toUsernames, content, cb) => {
    socket.emit('message', fromUsername, toUsernames, content, cb);
  };

  return {
    registerHandler,
    unregisterHandler,
    login,
    logout,
    message
  }
}
