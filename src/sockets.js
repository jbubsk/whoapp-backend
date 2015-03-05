var socketIO = require('socket.io');

module.exports = {
    setupListeners: function (server) {
        var io = socketIO(server);
        io.set('origins', '*:*');
        io.on('connection', function (socket) {
            socket.on('user:connected', function (username) {
                io.emit('user:connected', 'user ' + username + ' is connected');
            });

            socket.on('user:location:changed', function (user) {
                io.emit('user:location:changed', 'user ' + user + ' changed location');
            });
        });
    }
};