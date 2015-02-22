var Client = require('./client');

var WebClient = function(socket,data) {
  this.socket = socket;
  this.id = data.id;
  this.data = data;
};

WebClient.prototype = Object.create(Client.prototype);

module.exports = WebClient;