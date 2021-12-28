#!/usr/bin/env node

/**
 * Module dependencies.
 */

const app = require('../app');
const debug = require('debug')('server:server');
const http = require('http');
const CONFIG = require('../config/config');
/**
 * Get port from environment and store in Express.
 */

//  const port = normalizePort(CONFIG.appPort || '3000');
const port = CONFIG.appPort;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
server.setTimeout(500000);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
const normalPort = parseInt(val, 10);

if (isNaN(normalPort)) {
    // named pipe
    return val;
}

if (normalPort >= 0) {
    // port number
    return normalPort;
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

const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

// handle specific listen errors with friendly messages
switch (error.code) {
    case 'EACCES':
    console.error(`${bind} requires elevated privileges`);
    process.exit(1);
    break;
    case 'EADDRINUSE':
    console.error(`${bind} is already in use`);
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
const addr = server.address();
const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
debug(`Listening on ${bind}`);

console.log('Server listenning on port:', addr.port);
}
