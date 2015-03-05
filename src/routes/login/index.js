var userService = require('../../services/user'),
    logger = require('../../logger-winston');

function login(req, res, next) {
    userService.login(req.body, function (err, user) {
        if (err) {
            logger.error(err);
            res.status(err.status || err).send();
        } else {
            req.session.username = user.username;
            res.json({
                username: user.username
            });
        }
    });
}

module.exports = {
    login: login
};