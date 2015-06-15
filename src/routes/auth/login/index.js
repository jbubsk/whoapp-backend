var passport = require('passport'),
    logger = require('../../../logger-winston');

function login(req, res, next) {
    passport.authenticate('local', function (err, user) {

        if (err) {
            logger.error(err);
            return res.status(err).json({
                code: 100,
                result: 'db connection error'
            });
        }
        if (!user) {
            return res.status(400).json({
                result: 'user/pwd is not found'
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({
                result: {username: user.username}
            });
        });
    })(req, res, next);
}

module.exports = login;
