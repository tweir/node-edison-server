var EddyClientRepo = function()
{
  this.clientsById = {};
}

EddyClientRepo.prototype.addClient = function(client) {
  console.log("Add client: " + client.id);
  this.clientsById[client.id] = client;
}

EddyClientRepo.prototype.getClientSocket = function(clientId) {
  var client = this.clientsById[clientId];
  if (client===undefined){
    console.error("No client found: " + clientId);
    return undefined;
  }
  return client.socket;
}

var inst = new EddyClientRepo();

module.exports = inst;