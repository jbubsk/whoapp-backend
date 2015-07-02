var authenticationService = require('../../../services/authentication');

module.exports = function (req, res, next) {

    if (req.user) {
        authenticationService.logout(req.user.username, function (err, result) {
            if (err) {
                res.status(err.status || 400).json({message: err.message, code: err.code});
            } else {
                res.json({
                    result: "user is logged out"
                });
            }
        });
    } else {
        res.status(401).json({result: 'user isn\'t authenticated'});
    }
};
