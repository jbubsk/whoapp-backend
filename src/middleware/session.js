var session = require('express-session'),
    config = require('../config');

module.exports = function () {
    return session({
        name: config.sessionIdCookie,
        secret: 'FtrEE55ht0',
        resave: true,
        saveUninitialized: false
    });
};