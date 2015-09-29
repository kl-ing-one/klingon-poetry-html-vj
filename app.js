var osc = require('node-osc');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var oscServer = new osc.Server(3333, '127.0.0.1'); 

app.get('/', function(req, res){
   res.sendfile('index.html');
});
app.get('/assets/socket.io.js', function(req, res){
   res.sendfile('assets/socket.io.js');
});
app.get('/assets/moo.js', function(req, res){
   res.sendfile('assets/moo.js');
});
app.get('/assets/moo.more.js', function(req, res){
    res.sendfile('assets/moo.more.js');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  io.emit('chat message', 'woho');
});


http.listen(3000, '127.0.0.1', function(){
  console.log('listening on *:3000');
});


oscServer.on("message", function (msg, rinfo) 
{ 
	console.log("TUIO message:"); 
	console.log(msg); 
	io.emit('osc message', msg);
});