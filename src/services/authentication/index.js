var userService = require('../users'),
    utils = require('../../utils'),
    handleQuery = utils.handleQuery();

function validPassword(password, user) {
    return utils.encryptPwd(password, user.salt) === user.password;
}

function login(username, password, done) {
    userService.getUser({username: username, password: password}, function (err, users) {
        var user;
        if (users instanceof Array && users.length > 0) {
            user = users[0];
        }

        if (err) {
            return done(err, false);
        }
        if (!user) {
            return done({code: 400, message: 'USER_NOT_FOUND'}, false);
        }
        if (user.salt && !validPassword(password, user)) {
            return done({code: 400, message: 'USER_NOT_FOUND'}, false);
        }
        return done(null, user);
    });
}

function logout(username, callback) {
    userService.setNetworkStatus({
        username: username,
        network_status: 0
    }, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result)
    });
}

function signup(params, callback) {
    userService.createUser(params, function (err, result) {
        if (err) {
            return callback(err, null);
        }
        return callback(null, result);
    });
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup
};
