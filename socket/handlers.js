const sharp = require('sharp');
const authentication = require('../authentication');
const User = require('../models/users');
const Chat = require('../models/chats');

module.exports = function (_id, username, client, clientManager, chatManager) {


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
        if (!clientManager.getClient(String(userToAdd._id)))
          userToAdd.newContacts.push(user._id);

        userToAdd.save()
        .then(newUserToAdd => {
          // if userToAdd is online, notify them immidiately
          let userToAddSocket = clientManager.getClient(String(userToAdd._id));
          if (userToAddSocket) {
            let { _id, username, name, picture } = user;
            let contact = { _id, username, name, picture, online: true };
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
            // notify contacts of the user of change
            user.contacts.forEach(contact => {
              let contactSocket = clientManager.getClient(String(contact));
              if (contactSocket) {
                client.to(`${contactSocket.id}`).emit('CONTACT_UPDATE', { username, picture: updatedUser.picture });
              }
            });
          }).catch(err => {throw new Error(err.message)});
        }).catch(err => {throw new Error(err.message)});
    }).catch(err => {
      console.log('In UPLOAD_PICTURE Error: ', err.message);
      client.emit('UPLOAD_PICTURE_FAILED', err.message);
    });
  };

  const handleChangeName = ({ name, token }) => {
    console.log('changing name');
    if (!authentication.tokenOK(token)) return;
    User.findOneAndUpdate({ username }, { $set: { name } }, {new: true})
    .then(user => {
      client.emit('CHANGE_NAME_SUCCESS', user.name);
      // notify contacts of the user of change
      user.contacts.forEach(contact => {
        let contactSocket = clientManager.getClient(String(contact));
        if (contactSocket)
          client.to(`${contactSocket.id}`).emit('CONTACT_UPDATE', { username, name: user.name });
      });
    }).catch(err => {
      console.log('In CHANGE_NAME Error: ', err.message);
      client.emit('CHANGE_NAME_FAILED', err.message);
    });
  };

  const handleFirstMessage = ({ users, content, token }) => {
    console.log('received first message');
    const notifyOfNewChat = (chat) => {
      users.forEach(id => {
        let userSocket = clientManager.getClient(String(id));
        if (userSocket) // if the user is online
          userSocket.emit('FIRST_MESSAGE_SUCCESS', chat);
      });
    };

    if (!authentication.tokenOK(token)) return;
    Chat.findOne({ users })
    .then(res => {
      if (!res) { // such a chat doesn't exist yet
        let newChat = new Chat({ users, messages: [{ from: _id, content }] });
        newChat.save()
        .then(chat => notifyOfNewChat(chat))
        .catch(err => {throw new Error(err.message)});
      } else { // a chat already exists (if two users tried to create a chat approx at the same time)
        res.messages.push({ from: _id, content });
        res.save()
        .then(chat => notifyOfNewChat(chat))
        .catch(err => {throw new Error(err.message)});
      }
    })
    .catch(err => client.emit('FIRST_MESSAGE_FAILED', err.message));
  };

  const handleMessage = ({ chatId, content, token }) => {
    if (!authentication.tokenOK(token)) return;
    Chat.findById(chatId)
    .then(chat => {
      if (!chat) throw new Error('Chat not found.');
      else {
        chat.messages.push({ from: _id, content});
        chat.save()
        .then(updatedChat => {
          updatedChat.users.forEach(id => {
            let userSocket = clientManager.getClient(String(id));
            if (userSocket)
              userSocket.emit('MESSAGE_SUCCESS', { chatId, message: updatedChat.messages[updatedChat.messages.length -  1] });
          });
        })
        .catch(err => {throw new Error(err.message)});
      }
    })
    .catch(err => socket.emit('MESSAGE_FAILED', err.message));
  };

  const handleAddPersonToChat = ({ chatId, userId, token }) => {
    if (!authentication.tokenOK(token)) return;
    Chat.findById(chatId)
    .then(chat => {
      if (!chat) throw new Error('Chat not found.');
      else {
        chat.users.push(userId);
        chat.save()
        .then(updatedChat => {
          updatedChat.users.forEach(id => {
            User.findById(id)
            .then(participant => {
              for (let userId of updatedChat.users) {
                if (userId !== user._id && !participant.contacts.includes(String(userId)))
                  addContactOneSide(participant, userId, (err) => {
                    if (err) throw new Error(err.mesage);
                    let userSocket = clientManager.getClient(String(id));
                    if (userSocket)
                      userSocket.emit('ADD_PERSON_TO_CHAT_SUCCESS', { chatId, userId });
                  });
                else {
                  let userSocket = clientManager.getClient(String(id));
                  if (userSocket)
                    userSocket.emit('ADD_PERSON_TO_CHAT_SUCCESS', { chatId, userId });
                }
              }
            })
          });
        })
        .catch(err => {throw new Error(err.message)});
      }
    })
    .catch(err => socket.emit('ADD_PERSON_TO_CHAT_FAILED', err.message));
  };

  const addContactOneSide = (user, idToAdd, callback) => {
    user.contacts.push(idToAdd);
    let userSocket = clientManager.getClient(String(user._id));
    if (!userSocket) user.newContacts.push(idToAdd);
    user.save()
    .then(updatedUser => {
      User.findById(idToAdd)
      .lean()
      .then(newContact => {
        let { _id, username, name, picture } = newContact;
        let newContactSocket = clientManager.getClient(String(newContact._id));
        if (userSocket)
          userSocket.emit('NEW_CONTACT', { _id, username, name, picture, online: !!newContactSocket });
        callback(null);
      })
      .catch(err => callback(err));
    })
    .catch(err => callback(err));
  };

  const handleLogout = () => {
    console.log(username, " logged out");
    clientManager.removeClient(String(_id));
    client.disconnect(true);
  }

  function handleDisconnect() {
    console.log(username, ' disconnected');
    clientManager.removeClient(String(_id));
    User.findOne({ username })
    .then(user => {
      //console.log('notifying contacts of', user);
      user.contacts.forEach(contact => {
        console.log('notifying', contact.username);
        let contactSocket = clientManager.getClient(String(contact));
        if (contactSocket)
          contactSocket.emit('CONTACT_UPDATE', { username, online: false });
      })
    }).catch(err => console.log('In DISCONNECT Error: ', err.message));
  }

  return {
    handleAddContact,
    handleUploadPicture,
    handleChangeName,
    handleFirstMessage,
    handleAddPersonToChat,
    handleLogout,
    handleMessage,
    handleDisconnect
  }
}
