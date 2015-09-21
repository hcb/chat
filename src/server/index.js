var app = require('express')();
var express= require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var name = require('./names');
var pokemessage = require('./pokemessage');

app.get('/', function(req, res){
  console.log(path.join(__dirname, '../client', 'index.html'));
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../client')));

app.use('/reset', express.static(path.join(__dirname, '../../node_modules/normalize.css/')));

var nameList = name.nameList();
var users = [];

// io Connection
var chat = io.on('connection', function(socket) {

  // update user list
  var newUser = createUser(socket.id);
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
    var pokeMsg = pokemessage.getPokeMessage(user.name, msg);
    console.log(user.name, msg, pokeMsg);
    io.emit('chat message', user, pokeMsg);
  });

  // Error
  socket.on('error', function(err) {
    console.log('ERROR: ', err);
  });

});


// Helper functions
var createUser = function(id) {
  var n = randomIndex(nameList);
  userData = {
    id: id,
    name: nameList[n],
    number: n + 1
  };

  return userData;
};

var getUser = function(socketID) {
  for(var i = 0; i < users.length; i++) {
    if (users[i].id == socketID) {
      return users[i];
    }
  }
  return false;
};


var capitalize = function(string)  {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var randomIndex = function(array) {
  return Math.round((array.length - 1) * Math.random());
};


http.listen(3000, function(){
  console.log('listening on *:3000');
});
