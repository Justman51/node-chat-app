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

socket.on('newLocationMessage', function(message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');
   li.text(`${message.from}: `);
   a.attr('href', message.url)
   li.append(a)
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

    var messsageTextBox = $('input[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messsageTextBox.val()
    }, function() {
         messsageTextBox.val('');
    })
});

var locationButton = $('#send-location');

locationButton.on('click', function() {
     if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
     }

     navigator.geolocation.getCurrentPosition(function(position) {
         console.log(position);
         socket.emit('createLocationMessage', {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
         });
       // console.log(position.coords.latitude, position.coords.longitude); // 
      }, function() {
          alert('Unable to fetch location.')
      });
})

