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

socket.on('newLocationMessage', function(msg) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');

    li.text(`${msg.from}: `);
    a.attr('href', msg.url);
    li.append(a);
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

var locationBtn = $('#send-location');

locationBtn.on('click', function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser :(');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(err) {
        console.log(err);
        alert('unable to fetch location.');
    });
});