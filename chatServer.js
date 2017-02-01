var mongoose = require('mongoose');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var usersOnline = [];


io.on('connection',function(socket){

  socket.on('new-message',function(data){
    io.to(users[data.user]).emit('receive-message', {
        message: data.message
    });
  });

  socket.on('set-name',function(username){

    usersOnline.push(username);
    users[username] = socket.id;

 });

 socket.on('end', function (username){
   var usr = usersOnline.filter(function(user){
       return user != username;
   });
   usersOnline = usr;
   socket.disconnect(0);
 });
});

http.listen('5001',function(){
  console.log('chat server running port:5001');
});
