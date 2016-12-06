const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port      = process.env.PORT || 3000;

var app         = express();
var server      = http.createServer(app);
var io          = socketIO(server);

const {
    generateMessage,
    generateLocationMessage} = require('./utils/message.js');


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected`);

    socket.on('disconnect', (socket) => {
        console.log(`Client disconnected`);
    });

    // emit to user who joined
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (msg, callback) => {
        console.log(`createMessage`);
        console.log(msg);
        io.emit('newMessage', generateMessage(msg.from, msg.text));
        callback('This is form the server');
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.lat, coords.lng));
    });
});

server.listen(port, () => console.log(`App running on port: ${port}`));