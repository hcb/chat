var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var name = require('./names');

app.get('/', function(req, res){
  res.sendfile('index.html');
});


var nameList = name.nameList();
var users = [];

// io Connection
var chat = io.on('connection', function(socket) {

  // update user list
  var newUser = {
    id: socket.id,
    name: nameList[Math.round((nameList.length - 1) * Math.random())]
  }

  users.push(newUser);
  console.log(newUser.name + ' has connected.');

  // Disconnects
  socket.on('disconnect', function(){
    var user = getUser(socket.id);
    console.log(user.name + ' has disconnected.');
  });

  // Chat message
  socket.on('chat message', function(msg) {
    var user = getUser(socket.id);
    io.emit('chat message', user, msg);
  });

  // Error
  socket.on('error', function(err) {
    console.log('ERROR: ', err);
  })


});


// Helper functions
var getUser = function(socketID) {
  for(var i = 0; i < users.length; i++) {
    if (users[i].id == socketID) {
      return users[i];
    }
  }
  return false;
}


http.listen(3000, function(){
  console.log('listening on *:3000');
});
