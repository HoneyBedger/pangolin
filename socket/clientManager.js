// mapping of all connected clients
const onlineClients = new Map();

const clientManager = {
  addClient: (socket, username) => {
    onlineClients.set(username, socket);
  },

  removeClient: (username) => {
    onlineClients.delete(username);
  },

  getClient: (username) => {
    return onlineClients.get(username);
  }
};

module.exports = clientManager;
