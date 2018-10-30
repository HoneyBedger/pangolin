import socketIO from 'socket.io-client';
import config from './config'

export default function() {
  const socket = socketIO.connect(config.serverHost);

  socket.on('error', function (err) {
    console.log('received socket error:', err);
  });

  const registerHandler = (onMessageReceived) => {
    socket.on('message', onMessageReceived);
  }

  const unregisterHandler = () => {
    socket.off('message');
  }

  const register = (username, password, name, cb) => {
    socket.emit('register', username, password, name, cb);
  };

  const login = (username, password, cb) => {
    socket.emit('enter', username, password, cb);
  };

  const logout = (username, cb) => {
    socket.emit('leave', username, cb);
  };

  const message = (fromUsername, toUsernames, content, cb) => {
    socket.emit('message', fromUsername, toUsernames, content, cb);
  };

  return {
    registerHandler,
    unregisterHandler,
    register,
    login,
    logout,
    message
  }
}
