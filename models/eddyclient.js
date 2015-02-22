var Client = require('./client');

var EddyClient = function(socket,data) {
  this.socket = socket;
  this.id = data.id;
  this.data = data;
};

EddyClient.prototype = Object.create(Client.prototype);

module.exports = EddyClient;