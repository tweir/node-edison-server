var WebClientRepo = function()
{
  this.clients = [];
}
WebClientRepo.prototype.addClient = function(client) {
  this.clients.push(client);
}

WebClientRepo.prototype.eddyConnected = function(eddy){
  for(var i=0; i<this.clients.length;i++)
  {
    var client = this.clients[i];
    client.eddyConnected(eddy);
  }
}

var inst = new WebClientRepo();

module.exports = inst;