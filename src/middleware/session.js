var session = require('express-session'),
    config  = require('../config');

module.exports = function () {
    return session({
        name              : config.sessionIdCookie,
        //domain: '192.168.9.144',
        secret            : 'FtrEE55ht0',
        resave            : false,
        saveUninitialized : true
    });
};