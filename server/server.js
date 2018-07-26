const path = require('path');
const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


const {generateMessage, generateLocationMessage} = require('./utils/message');

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')))


io.on('connection', (socket) =>{ 
    console.log('New user connected');

    // socket.emit('newMessage', { 
    //     from: 'joker@example.com',
    //     text: 'Hey, what going on',
    //     createAt: 123
    // });

    socket.emit('newMessage', generateMessage('admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined'));

    socket.on('createMessage', (message, callback)=> { // emit to only one user connected
      // console.log('Got your message thanks', message);
           io.emit('newMessage', generateMessage(message.from, message.text));
           callback();   
    });

    socket.on('createLocationMessage', (coords) => {
        console.log(coords);
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', (reason) => {
        console.log('User was disconnected');
      });
 });



server.listen(port, ()=> {
    console.log(`Starting express server on port: ${port}`);
});