const authentication = require('../authentication');
const User = require('../models/users');

module.exports = function (client, clientManager, chatManager) {

  function handleLogin(username, password, callback) {
    console.log(username, " logging in");
    User.authenticate()(username, password)
    .then(({user, err}) => {
      if (err) return callback(err.message, null);
      console.log("user", user);
      let { username, name, picture, contacts } = user;
      let token = authentication.getToken({_id: user._id});
      let result = { username, name, picture, contacts, token};
      console.log("authenticated as user", user);
      return callback(null, result);
    })
    .catch(err => callback(err.message, null));
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
    handleLogin,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
