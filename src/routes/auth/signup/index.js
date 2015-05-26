var userService = require('../../../services/user'),
    logger      = require('../../../logger-winston');

function signup(req, res) {

    userService.createUser(req.body, function (err) {
        if (err) {
            res.json({error : err});
            logger.error('userService.createUser: ' + err);
        } else {
            res.json({result : 'success'});
        }
    });
}

module.exports = signup;