module.exports = function () {
  // mapping of all connected clients
  const onlineClients = new Map()

  const addClient = (socket, username) => {
    onlineClients.set(username, socket);
  };

  const removeClient = (username) => {
    onlineClients.delete(username);
  };

  const getClient = (username) => {
    return onlineClients.get(username);
  };

  return {
    addClient,
    removeClient,
    getClient
  };
};
