const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port      = process.env.PORT || 3000;

var app         = express();
var server      = http.createServer(app);
var io          = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected`);

    socket.on('disconnect', (socket) => {
        console.log(`Client disconnected`);
    });

    // emit to user who joined
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (msg) => {
        console.log(`createMessage`);
        console.log(msg);
        io.emit('newMessage', {
            from: msg.from,
            text: msg.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });
});

server.listen(port, () => console.log(`App running on port: ${port}`));