// mapping of all connected clients
const onlineClients = new Map();

const clientManager = {
  addClient: (socket, _id) => {
    console.log('adding', _id, 'to clientManager');
    onlineClients.set(_id, socket);
  },

  removeClient: (_id) => {
    onlineClients.delete(_id);
  },

  getClient: (_id) => {
    console.log('getting', _id, 'to clientManager');
    return onlineClients.get(_id);
  }
};

module.exports = clientManager;
