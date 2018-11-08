const sharp = require('sharp');
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
      //console.log('got the user:', user);
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
            let contact = { username, name, picture, online: true };
            userToAddSocket.emit('NEW_CONTACT', contact);
          }
        });
        console.log('done adding contact');
      });
    }).catch(err => console.log('In ADD_CONTACT Error: ', err.message));
  };

  const handleUploadPicture = ({ picture, type, token }) => {
    if (!authentication.tokenOK(token)) return;
    User.findOne({ username })
    .then(user => {
        let pictureBuffer = new Buffer(picture);
        sharp(pictureBuffer)
        .resize({ width: 100, height: 100, fit: 'contain'})
        .toBuffer()
        .then(resizedPicture => {
          user.picture = {
            data: resizedPicture.toString('base64'),
            type
          };
          user.save()
          .then(updatedUser => {
            client.emit('UPLOAD_PICTURE_SUCCESS', updatedUser.picture);
          }).catch(err => {throw new Error(err.message)});
        }).catch(err => {throw new Error(err.message)});
    }).catch(err => {
      console.log('In UPLOAD_PICTURE Error: ', err.message);
      client.emit('UPLOAD_PICTURE_FAILED', err.message);
    });
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
    User.findOne({ username })
    .populate('contacts')
    .then(user => {
      console.log('notifying contacts of', user);
      user.contacts.forEach(contact => {
        console.log('notifying', contact.username);
        let contactSocket = clientManager.getClient(contact.username);
        if (contactSocket)
          console.log(contact.username, ' is online');
          contactSocket.emit('CONTACT_OFFLINE', username);
      })
    }).catch(err => console.log('In DISCONNECT Error: ', err.message));
  }

  return {
    getUser,
    handleAddContact,
    handleUploadPicture,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
