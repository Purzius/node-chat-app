var socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.warn('Connection lost');
});

socket.on('newMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('H:mm');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);

    // var li = $('<li></li>');
    // li.text(`${msg.from} ${formattedTime}: ${msg.text}`);

    // $('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
    var formattedTime = moment(msg.createdAt).format('H:mm');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);

    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');

    // li.text(`${msg.from} ${formattedTime}: `);
    // a.attr('href', msg.url);
    // li.append(a);
    // $('#messages').append(li);
});

$('#message-form').on('submit', function(event) {
    console.log(`form submitted`);
    event.preventDefault();
    var inputElem = $('input[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: inputElem.val()
    }, function () {
        inputElem.val('');
    });
});

var locationBtn = $('#send-location');

locationBtn.on('click', function(event) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser :(');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationBtn.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function(err) {
        locationBtn.removeAttr('disabled').text('Send location');
        console.log(err);
        alert('unable to fetch location.');
    });
});