var socketIO = require('socket.io'),
    logger = require('./logger-winston'),
    cityService = require('./services/cities');

function setupListeners(server) {
    var io = socketIO(server);

    io.set('origins', '*:*');
    //io.set("transports", ["websocket"]);
    io.on('connection', function (socket) {
        logger.info("---> connected with client through socket");
        socket.on('user:connected', function (username) {
            io.emit('user:connected', 'user ' + username + ' is connected');
        });

        socket.on('user:location:changed', function (user) {
            io.emit('user:location:changed', 'user ' + user + ' changed location');
        });

        socket.on('findCity', function (searchText) {
            cityService.getCitiesByName(searchText, function (err, result) {
                if (!err) {
                    io.emit('cityFound', result);
                }
            });
        });
    });
}

module.exports = {
    setupListeners: setupListeners
};