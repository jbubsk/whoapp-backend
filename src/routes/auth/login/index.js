var userService = require('../../../services/user'),
    logger      = require('../../../logger-winston');

function login(req, res) {
    userService.login(req.body, function (err, user) {
        if (err) {
            logger.error(err);
            res.status(err.status || 400).send();
        } else {
            req.session.username = user.username;
            res.json({
                username : user.username
            });
        }
    });
}

module.exports = login;