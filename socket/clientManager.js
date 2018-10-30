module.exports = function () {
  // mapping of all connected clients
  const clients = new Map()

  /*function addClient(client) {
    clients.set(client.id, { client })
  }*/

  function registerClient(client, user) {
    clients.set(client.id, { client, user })
  }

  function removeClient(client) {
    clients.delete(client.id)
  }

  return {
    registerClient,
    removeClient
  }
}
