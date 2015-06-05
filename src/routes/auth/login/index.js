var passport = require('passport'),
	logger = require('../../../logger-winston');

function login(req, res, next) {
	passport.authenticate('local', function (err, user) {
		if (err) {
			logger.error(err);
			return next(err);
		}
		if (!user) {
			return res.status(400).send();
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
