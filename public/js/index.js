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

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});



socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// socket.emit('createMessage', {
//     from: 'frank',
//     text: 'Hi'
// }, function(data) {
//     console.log('Got it', data);
// });

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, function() {
        console.log('Got it');
    })
})

