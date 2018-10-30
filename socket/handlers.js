const User = require('../models/users');

module.exports = function (client, clientManager, chatManager) {

  function handleRegister(username, password, name, callback) {
    console.log("registering a user: ", username, password, name);
    User.register(new User({ username, name }), password)
    .then(user => {
      user.save()
      .then(userObj => {
        let { username, name, picture, contacts } = userObj;
        let user = { username, name, picture, contacts };
        console.log("registered a user: ", user);
        clientManager.registerClient(client, user);
        return callback(null, user);
      })
      .catch(err => callback(err.message, null));
    })
    .catch(err => callback(err.message, null));
  }


  function handleLogin(username, password, callback) {
    console.log(username, " logging in");
    User.authenticate(username, password)
    .then(user => {
      console.log("authenticated as user", user);
      return callback(null, user);
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
    handleRegister,
    handleLogin,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
