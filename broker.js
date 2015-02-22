
var EddyClient = require('./models/eddyclient');
var WebClient = require('./models/webclient');
var webClientRepo = require('./models/webclientrepo');
var eddyClientRepo = require('./models/eddyrepo');

var initSocketIO = function(server, redishostname, rediskey){
  var io = require('socket.io').listen(server);
  var pub = require('redis').createClient(6379,redishostname, {auth_pass: rediskey, return_buffers: true});
  var sub = require('redis').createClient(6379,redishostname, {auth_pass: rediskey, return_buffers: true});

  var redis = require('socket.io-redis');
  io.adapter(redis({pubClient: pub, subClient: sub}));
  return io;
}

function initEddyClient(socket, data){
  client = new EddyClient(socket, data);
  console.log(client);
  eddyClientRepo.addClient(client);
  socket.join('eddyclients');

  socket.broadcast.to('observers').emit('eddy_connected',{id:client.id,data:data});
  socket.on('disconnect', function(){
    console.log("Eddy client " + client.id + " disconnected.");
    socket.broadcast.to('observers').emit('eddy_disconnected',{id:client.id});
  });
  return client;
}

function initWebClient(socket,data){
  client = new WebClient(socket, data);
  webClientRepo.addClient(client);
  socket.on('disconnect',  function(){
    console.log("Web client " + client.id + " disconnected.");
  });
  socket.join('observers');
  return client;
}

function initClient(socket,data){
  if(data.clientType=='eddy')
  {
    return initEddyClient(socket,data);
  }
  else if (data.clientType=='web' || data.clientType=='observer')
  {
    return initWebClient(socket,data);
  }
  else
  {
    console.error("Undefined client type");
    console.error(data);
  }
}

function setupMessageRouting(io){
  io.on('connection', function (socket) {
    socket.on('init', function(data){
      console.log("Init");
      console.log(data);
      client = initClient(socket,data);
      client.setData(data);
    });
    socket.on('eddy_data', function(data){
      console.log("eddy_data");
      console.log(data);
      socket.broadcast.to('observers').emit('eddy_data',data);
    });
    socket.on('send_eddy_command', function(data){
      console.log("send_eddy_command");
      console.log(data);

      var eddySocket = eddyClientRepo.getClientSocket(data.clientId);
      eddySocket.emit('command',data);
    });
  });
}

module.exports = function(server, redishostname, rediskey){
  var io = initSocketIO(server, redishostname, rediskey);
  setupMessageRouting(io);
}

