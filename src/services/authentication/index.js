var userService = require('../user'),
    utils = require('../../utils');

function validPassword(password, user) {
    return utils.encryptPwd(password, user.salt) === user.password;
}

function login(username, password, done) {
    userService.getUser({username: username, password: password}, function (err, user) {
        if (err) {
            return done(100, false);
        }
        if (!user) {
            return done(400, false);
        }
        if (user.salt && !validPassword(password, user)) {
            return done(401, false);
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
            callback(err, null);
        } else {
            callback(null, result)
        }
    })
}

function signup(params, callback) {
    userService.createUser(params, function (err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    })
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup
};
