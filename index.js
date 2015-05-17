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

// Chat-astrophe

var http = require('http').Server(app);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});