var service = require('../../../services/authentication'),
    jwt = require('jsonwebtoken'),
    config = require('../../../config'),
    logger = require('../../../logger-winston');

function login(req, res, next) {
    var userAgent = req.headers['user-agent'],
        origin = req.headers['origin'],
        ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    service.login(req.body.username, req.body.password, function (err, user) {

        if (err) {
            return res.status(err.status || 400).json({message: err.message, code: err.code});
        }
        var profile = {
            userName: user.username,
            id: user.id,
            timestamp: new Date().getTime(),
            userAgent: userAgent,
            ip: ip
        };

        logger.jwt('profile for signing: ', profile);

        var token = jwt.sign(profile, config.secret, {expiresInMinutes: config.jwtExpirationInMinutes});

        return res.json({token: token});
    });
}

module.exports = login;
