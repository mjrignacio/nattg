var express = require('express');
var path = require('path');
var app = express();
var nattg = require('./nattg');

// Create Express app
app.configure(function() {
    app.use(express.logger('dev'));
    // Serve files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));
});

// Set port to 8080
var server = require('http').createServer(app).listen(8080);

// Instantiate Socket.IO server
var io = require('socket.io').listen(server);

io.set('log level',1);

// Listen for connections
io.sockets.on('connection', function (socket) {
    nattg.initGame(io, socket);
});