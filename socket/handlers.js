const authentication = require('../authentication');
const User = require('../models/users');

module.exports = function (username, client, clientManager, chatManager) {


  const getUser = (callback) => {
    console.log('getting the user after token:', username);
    User.findOne({ username })
    .populate('contacts', 'username name picture')
    .select('username name picture contacts')
    .lean()
    .then(res => {
      for (let c of res.contacts) {
        if (clientManager.getClient(c.username))
          c.online = true;
      }
      if (!res) throw new Error('User not found.');
      // Generate a new token since the old one just travelled as a query
      // string and has to be invalidated
      let token = authentication.getToken({ _id: res._id, username });
      let user = { ...res, token, tokenIsValid: true };
      console.log('got the user:', user);
      callback(null, user);
    }).catch(err => callback(err.message, null));
  };

  const handleAddContact = ({ usernameToAdd, token }) => {
    console.log('Adding contact:', usernameToAdd);
    if (!authentication.tokenOK(token)) return;
    // add contact to user's own list and add user to the contact's list
    User.findOne({ username })
    .then(user => {
      User.findOne({ username: usernameToAdd }).
      then(userToAdd => {
        user.contacts.push(userToAdd._id);
        user.save();
        userToAdd.contacts.push(user._id);
        // if userToAdd is not online, push to the list of new contacts so that
        // they get notified later
        if (!clientManager.getClient(usernameToAdd))
          userToAdd.newContacts.push(user._id);

        userToAdd.save()
        .then(newUserToAdd => {
          // if userToAdd is online, notify them immidiately
          let userToAddSocket = clientManager.getClient(usernameToAdd);
          if (userToAddSocket) {
            let { username, name, picture } = user;
            let contact = { username, name, picture };
            userToAddSocket.emit('NEW_CONTACT', contact);
          }
        });
        console.log('done adding contact');
      });
    }).catch(err => console.log('In ADD_CONTACT Error: ', err.message));
  };


  const handleLogout = () => {
    console.log(username, " logged out");
    clientManager.removeClient(username);
    client.disconnect(true);
  }

  function handleMessage(fromUsername, toUsernames, content, callback) {
    console.log(username, " wrote to ", toUsernames, " message: ", content);
  }

  function handleDisconnect() {
    console.log(username, ' disconnected');
    clientManager.removeClient(client);
  }

  return {
    getUser,
    handleAddContact,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
