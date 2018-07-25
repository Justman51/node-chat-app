var socket = io(); // Making a request to the server
socket.on('connect',  function() {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'jen@example.com',
    //     text: 'Hey, this is Andrew.'
    // })
});


socket.on('newMessage', function(message) { // receiver is here
    console.log('Got your message', message);
});



socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

