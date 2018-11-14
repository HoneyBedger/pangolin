const authentication = require('../authentication');
const User = require('../models/users');
const Chat = require('../models/chats');

module.exports = function(client, clientManager, callback) {
  let username = client.handshake.headers['username'];
  User.findOne({ username })
  .populate('contacts', 'username name picture')
  .select('username name picture contacts newContacts')
  .then(res => {
    Chat.find({ users: res._id })
    .lean()
    .then(chats => {
      for (let c of res.contacts) {
        if (clientManager.getClient(String(c._id)))
          c.online = true;
      }
      if (!res) throw new Error('User not found.');
      let token = authentication.getToken({ _id: res._id, username });
      let user = { ...res._doc, token, tokenIsValid: true };
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
