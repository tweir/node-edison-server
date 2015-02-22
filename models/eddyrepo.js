var EddyClientRepo = function()
{
  this.clientsById = {};
}

EddyClientRepo.prototype.addClient = function(client) {
  this.clientsById[client.id] = client;
}

EddyClientRepo.prototype.getClientSocket = function(clientId) {
  return this.clientsById[clientId].socket;
}

var inst = new EddyClientRepo();

module.exports = inst;