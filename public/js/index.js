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
});