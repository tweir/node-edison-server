var EddyClientRepo = function()
{
  this.clientsById = {};
}

EddyClientRepo.prototype.getAll = function(client){
  var l = [];
  for(var id in this.clientsById) {
    if(this.clientsById.hasOwnProperty(id)){
      var c = this.clientsById[id];
      l.push({id:c.id,status:c.status,sensors:c.sensors});
    }
  }
  return l;
}

EddyClientRepo.prototype.addClient = function(client) {
  console.log("Add client: " + client.id);
  client.status = "connected";
  client.sensors = {};
  this.clientsById[client.id] = client;
}

EddyClientRepo.prototype.setClientStatus = function(id,status){
  console.log("Setting client status: "+id +" "+status);
  this.clientsById[id].status = status;
}

EddyClientRepo.prototype.setSensorValue = function(id,name,value){
  this.clientsById[id].sensors[name] = value;
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