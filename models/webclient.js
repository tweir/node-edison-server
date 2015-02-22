var WebClient = function(socket) {
  this.socket = socket;
  this.data = {};
};

WebClient.prototype.eddyConnected = function(eddy) {
  this.socket.emit('watcher',eddy.data);
}

module.exports = WebClient;