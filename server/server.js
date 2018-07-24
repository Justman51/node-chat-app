const path = require('path');
const express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../public')))


io.on('connection', (socket) =>{ 
    console.log('New user connected');

    socket.on('disconnect', (reason) => {
        console.log('User was disconnected');
      });
 });




server.listen(port, ()=> {
    console.log(`Starting express server on port: ${port}`);
});