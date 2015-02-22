var Client = function(socket) {
  this.socket = socket;
  this.id = null;
  this.data = null;
};

Client.prototype.setId = function (id) {
  this.id = id;
}

Client.prototype.setData = function (data) {
  this.data = data;
}

module.exports = Client;