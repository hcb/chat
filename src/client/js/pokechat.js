$(document).ready(function() {

  var socket = io();

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(user, msg){
    console.log(user, msg);
    var $message = $('<li class="message"></li>');
    $message
      .html('<span class="valign"></span><span class="content"><strong>' +
      user.name + '</strong>: ' + msg + '</span>')
      .css({ 'background-image': 'url(img/' + user.number + '.png)' });
    $('#messages').append($message);
  });

});
