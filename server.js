#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('./app');
var debug = require('debug')('node-edison-server:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4222');
app.set('port', port);

/**
 * Create HTTP server.
 */

console.log("TestKey: " + process.env.TestKey);
console.log("RedisHostName: " + process.env.RedisHostName);
console.log("RedisKey: " + process.env.RedisKey);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);

var io = require('socket.io')(server);
var redishostname = process.env.RedisHostName;
var rediskey = process.env.RedisKey;
var pub = require('redis').createClient(6379,redishostname, {auth_pass: rediskey, return_buffers: true});
var sub = require('redis').createClient(6379,redishostname, {auth_pass: rediskey, return_buffers: true});

var redis = require('socket.io-redis');
io.adapter(redis({pubClient: pub, subClient: sub}));

var webClientRepo = require('./models/webclientrepo');
var eddyClientRepo = require('./models/eddyrepo');
var EddyClient = require('./models/eddyclient');
var WebClient = require('./models/webclient');

io.on('connection', function (socket) {
  socket.on('init', function(data){
    console.log("Init");
    console.log(data);
    if(data.clientType=='eddy')
    {
      var eddy = new EddyClient(socket,data);
      eddyClientRepo.addClient(eddy);
      webClientRepo.eddyConnected(eddy);
    }
    if (data.clientType=='web')
    {
      var webClient = new WebClient(socket);
      webClientRepo.addClient(webClient);
    }
  });
  socket.emit('welcome', { hello: 'world' });
  socket.on('test', function (data) {
    console.log(data);
  });
});

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
