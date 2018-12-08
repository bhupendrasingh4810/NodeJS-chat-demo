module.exports = function (app) {
    var index = require('../controller/index.controller')
    var workspace = require('../controller/workspace.controller')
    var channel = require('../controller/channel.controller')
    var user = require('../controller/user.controller')
    var http = require('http')
    var io = require('socket.io').listen(http.createServer(app))

    app.get('/', function(req, res) {
        res.render('login');
     });

    app.post('/login', index.login)
    app.post('/forgot-password', index.forgotPassword)
    app.post('/token', index.generateToken)
    app.put('/change-password/:id', index.changePassword)
    app.post('/logout', index.logout)

    app.post('/workspace', workspace.createWorkspace)
    app.put('/workspace-status/:id', workspace.activateOrDeactivateWorkspace)
    app.put('/workspace/:id', workspace.updateWorkspace)
    app.get('/workspace', workspace.getAllWorkspace)
    app.get('/workspace/:id', workspace.getWorkspace)
    app.delete('/workspace/:id', workspace.deleteWorkspace)

    app.post('/channel', channel.createChannel)
    app.put('/channel-status/:id', channel.activateOrDeactivateChannel)
    app.put('/channel/:id', channel.updateChannel)
    app.get('/channel', channel.getAllChannel)
    app.get('/channel/:id', channel.getChannel)
    app.delete('/channel/:id', channel.deleteChannel)

    app.post('/user', user.createUser)
    app.put('/user', user.userSignUp)
    app.put('/user-status/:id', user.activateOrDeactivateUser)
    app.get('/user', user.getAllUser)
    app.get('/user/:id', user.getUser)
    app.delete('/user/:id', user.deleteUser)

    var numUsers = 0;

    io.on('connection', (socket) => {
        var addedUser = false;
        console.log('hello');
        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: numUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', () => {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', () => {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    });
}