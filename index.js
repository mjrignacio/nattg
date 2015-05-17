var express = require('express');
var path = require('path');
var app = express();
var nattg = require('./nattg');

app.use(express.static(__dirname + '/public'));

// Set port to 8080
var server = require('http').createServer(app).listen(8080);

// Instantiate Socket.IO server
var io = require('socket.io').listen(server);

io.set('log level',1);

// Listen for connections
io.sockets.on('connection', function (socket) {
    nattg.initGame(io, socket);
});