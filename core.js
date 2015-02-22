#!/usr/bin/env node

/**
 * Module dependencies.
 */

function core(){
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

  var broker=require('./broker')(server,process.env.RedisHostName,process.env.RedisKey);
  server.listen(port);

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
}


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

module.exports=core;