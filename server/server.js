const path      = require('path');
const http      = require('http');
const express   = require('express');
const socketIO  = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port      = process.env.PORT || 3000;

const {
    generateMessage,
    generateLocationMessage} = require('./utils/message.js');
const {isRealString}        = require('./utils/validation.js');
const {Users}               = require('./utils/users.js');

var app         = express();
var server      = http.createServer(app);
var io          = socketIO(server);
var users       = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log(`New user connected`);

    socket.on('disconnect', () => {
        console.log(`Client disconnected`);
        var user = users.removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        };
    });

    


    // join room
    socket.on('join', (params, cb) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return cb('Name & room name are required');
        }

        socket.join(params.room);
        // socket.leave(prams.room);
        // io.emit -> io.to('theoffice').emit
        // socket.broadcast.emit -> socket.broadcast.to('theoffice').emit

        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // emit to user who joined
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat'));

        // emit to all others but the user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined` ));

        cb();
    });


    socket.on('createMessage', (msg, callback) => {
        console.log(`createMessage`);

        var user = users.getUser(socket.id);
        if(user && isRealString(msg.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, msg.text));
        }
        
        callback();
        // socket.broadcast.emit('newMessage', {
        //     from: msg.from,
        //     text: msg.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        if(user && coords) {
            // emit to all users including self
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.lat, coords.lng));
        }
    });
});

server.listen(port, () => console.log(`App running on port: ${port}`));