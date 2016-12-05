var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.warn('Connection lost');
});

socket.on('newMessage', function(msg) {
    console.log(`New message`);
    console.log(msg);

    var li = $('<li></li>');
    li.text(`${msg.from}: ${msg.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', function(event) {
    console.log(`form submitted`);
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('input[name=message]').val()
    }, function () {

    });
});