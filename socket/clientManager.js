//==Mapping of all connected clients===//
const onlineClients = new Map();

const clientManager = {
  addClient: (socket, _id) => {
    onlineClients.set(_id, socket);
  },

  removeClient: (_id) => {
    onlineClients.delete(_id);
  },

  getClient: (_id) => {
    return onlineClients.get(_id);
  }
};

module.exports = clientManager;
