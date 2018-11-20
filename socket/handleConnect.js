//===DEPENDENCIES==//
const authentication = require('../authentication');
const User = require('../models/users');
const Chat = require('../models/chats');
//=================//


//===Check the token and username provided by the user,
//  send the user object, contacts, and chats if everything OK,
//  notify other users that this one is online ===//
module.exports = function(client, clientManager, callback) {
  let username = client.handshake.headers['username'];
  User.findOne({ username })
  .populate('contacts', 'username name picture')
  .select('username name picture contacts newContacts')
  .then(res => {
    Chat.find({ users: res._id })
    .lean()
    .then(chatsRes => {
      if (!res) throw new Error('User not found.');
      let chats = chatsRes.map(chat => ({
         ...chat, numUnseenMsgs: chat.numUnseenMsgs.filter(obj => String(obj.userId) === String(res._id))[0].numUnseen
       }));
      let contacts = res.contacts.map(c => (
        { ...c._doc, online: !!clientManager.getClient(String(c._id))}
      ));
      let token = authentication.getToken({ _id: res._id, username });
      let user = { ...res._doc, contacts, token, tokenIsValid: true };
      clientManager.addClient(client, String(res._id));
      client.emit('CONNECTION_TO_SOCKET_SUCCESS', { user, chats });
      res.contacts.forEach(contact => {
        let contactSocket = clientManager.getClient(String(contact._id));
        if (contactSocket)
          client.to(`${contactSocket.id}`).emit('CONTACT_UPDATE', { username, online: true });
      });
      res.newContacts = []; // assume the user sees the new contacts once connected
      res.save();
      callback(null, { _id: res._id, username: res.username });
    })
    .catch(err => {
      client.emit('CONNECTION_TO_SOCKET_FAILED', err.message);
      callback(err.message, null);
    });
  }).catch(err => {
    client.emit('CONNECTION_TO_SOCKET_FAILED', err.message);
    callback(err.message, null);
  });
};
