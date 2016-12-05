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

    socket.emit('newMessage', {
        from: 'mads',
        text: 'Hey',
        createdAt: Date.now()
    });

    socket.on('createMessage', (msg) => {
        console.log(`createMessage`);
        console.log(msg);
    });
});

server.listen(port, () => console.log(`App running on port: ${port}`));