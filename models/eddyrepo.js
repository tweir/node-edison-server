var EddyClientRepo = function()
{
  this.clients = [];
}
EddyClientRepo.prototype.addClient = function(client) {
  this.clients.push(client);
}

var inst = new EddyClientRepo();

module.exports = inst;