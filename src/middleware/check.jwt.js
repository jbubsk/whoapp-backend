'use strict';
var logger = require('../logger-winston'),
    expressJwt = require('express-jwt'),
    config = require('../config');

module.exports = function () {
    var jwtMiddleware = expressJwt({secret: config.secret});

    return function (req, res, next) {

        jwtMiddleware(req, res, function (error) {
            var remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            if (error) {
                return res.status(401).json({message: error.message, code: error.code});
            }

            if (req.user.userAgent !== req.headers['user-agent'] || req.user.ip !== remoteAddress) {
                logger.jwt('integrity of token is broken');
                return res.status(401).json({message: 'integrity of token is broken', code: error.code});
            }
            logger.jwt('decoded token:', req.user);

            return next();
        });
    }
};