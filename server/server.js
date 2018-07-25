const path = require('path');
const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')))


io.on('connection', (socket) =>{ 
    console.log('New user connected');

    // socket.emit('newMessage', { 
    //     from: 'joker@example.com',
    //     text: 'Hey, what going on',
    //     createAt: 123
    // });

    socket.on('createMessage', (message)=> { // emit to only one user connected
      // console.log('Got your message thanks', message);
/* Broadcasting */  io.emit('newMessage', { // Emits to every user connected
           from: message.from,
           text: message.text,
           createAt: new Date().getTime()
       })
    })

    socket.on('disconnect', (reason) => {
        console.log('User was disconnected');
      });
 });




server.listen(port, ()=> {
    console.log(`Starting express server on port: ${port}`);
});