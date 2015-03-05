var User = require('../../models/user'),
    logger = require('../../logger-winston');

function saveUser(req, res) {
    var user;

    req.body.salt = new Date().getTime();
    user = new User(req.body);

    user.save(function (err) {
        var MongooseError,
            valError;

        if (err) {
            if (11000 === err.code || 11001 === err.code) {
                MongooseError = require('mongoose/lib/error');
                valError = new MongooseError.ValidationError(err);
                valError.errors["username"] = new MongooseError.ValidatorError('username', 'Duplicate found', err.err);
                err = valError
            }
            res.send(err);
            logger.error('user.save(): ' + err);
        } else {
            res.json({
                result: 'success'
            });
        }
    });
}

module.exports = saveUser;