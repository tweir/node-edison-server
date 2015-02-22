var WebClientRepo = function()
{
  this.clients = [];
  this.redisClient = undefined;
}

WebClientRepo.prototype.addClient = function(client) {
  this.clients.push(client);
}

var inst = new WebClientRepo();

module.exports = inst;