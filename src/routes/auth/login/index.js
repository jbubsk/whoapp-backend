var passport = require('passport'),
    logger = require('../../../logger-winston');

function login(req, res, next) {
    passport.authenticate('local', function (err, user) {

        if (err) {
            return res.status(err.code).json({message: err.message});
        }
        if (!user) {
            return res.status(400).json({
                message: 'USER_PWD_NOT_FOUND'
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.json({
                result: user.username
            });
        });
    })(req, res, next);
}

module.exports = login;
