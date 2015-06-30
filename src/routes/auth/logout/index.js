var authenticationService = require('../../../services/authentication');

module.exports = function (req, res, next) {

    if (req.user) {
        authenticationService.logout(req.user.username, function (err, result) {
            if (err) {
                res.status(err.code).json({message: err.message});
            } else {
                req.logout();
                res.json({
                    result: "user is logged out"
                });
            }
        });
    } else {
        res.status(401).json({result: 'user isn\'t authenticated'});
    }
};
