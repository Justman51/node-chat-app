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

    socket.emit('newMessage', {
        from: 'admin',
        text: `Welcome to the chat app`
    });

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'New user joined'
    })

    socket.on('createMessage', (message)=> { // emit to only one user connected
      // console.log('Got your message thanks', message);
  io.emit('newMessage', { // Emits to every user connected
           from: message.from,
           text: message.text,
           createAt: new Date().getTime()
       })

       /* Broadcasting */

    //    socket.broadcast.emit('newMessage', {
    //     from: message.from,
    //         text: message.text,
    //         createAt: new Date().getTime()
    //    })
                 
    

    })

    socket.on('disconnect', (reason) => {
        console.log('User was disconnected');
      });
 });




server.listen(port, ()=> {
    console.log(`Starting express server on port: ${port}`);
});