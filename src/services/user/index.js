var User = require('../../models/user'),
    logger = require('../../logger-winston');


function login(params, callback) {
    User.findOne({username: params.username}, function (err, user) {
        if (err) {
            return callback(err, null);
        } else if (!user) {
            callback({status: 401}, null);
        } else if (!user.checkPassword(params.password)) {
            callback({status: 401}, null);
        } else {
            callback(null, user);
        }
    });
}

module.exports = {
    login: login
};