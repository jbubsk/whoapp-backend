var userService = require('../../../services/users'),
    logger      = require('../../../logger-winston');

function signup(req, res) {

    userService.createUser(req.body, function (err) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result : 'success'});
        }
    });
}

module.exports = signup;