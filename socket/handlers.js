const authentication = require('../authentication');
const User = require('../models/users');

module.exports = function (client, clientManager, chatManager) {


  const getUser = (username, callback) => {
    console.log('getting the user after token:', username);
    User.findOne({ username })
    .populate('contacts')
    .then(res => {
      if (!res) throw new Error('User not found.');
      let { username, name, picture, contacts } = res;
      // Generate a new token since the old one just travelled as a query
      // string and has to be invalidated
      let token = authentication.getToken({ _id: res._id, username });
      let user = { username, name, picture, contacts, token, tokenIsValid: true };
      console.log('got the user:', user);
      callback(null, user);
    }).catch(err => callback(err.message, null));
  }


  function handleLogout(username, callback) {
    console.log(username, " logging out");
  }

  function handleMessage(fromUsername, toUsernames, content, callback) {
    console.log(username, " wrote to ", toUsernames, " message: ", content);
  }

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client)
    // remove member from all chatrooms
    chatManager.removeClient(client)
  }

  return {
    getUser,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
