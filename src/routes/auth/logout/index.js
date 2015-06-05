var authenticationService = require('../../../services/authentication');

module.exports = function (req, res, next) {

    if (req.user) {
        authenticationService.logout(req.user.username, function (err, result) {
            if (err) {
                res.json({status: null, message: 'Some error occurred during logout'});
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
