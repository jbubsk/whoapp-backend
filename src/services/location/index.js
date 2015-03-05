var User = require('../../models/user'),
    common = require('../../common');

function getRemoteLocation(callback) {
    User.find({online: true}, 'username latitude longitude', function (err, location) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, location);
        }
    });
}

function shareLocation(params, callback) {
    var updateObject = {};

    if (params.latitude && params.longitude) {
        updateObject.latitude = params.latitude;
        updateObject.longitude = params.longitude;
        updateObject.online = true;
    } else {
        updateObject.online = false;
    }

    User.update({username: params.username}, {$set: updateObject}, function (err, user) {
        if (err) {
            callback(err, null);
        } else if (!user) {
            callback("User's not found", null);
        } else {
            callback(null, 'ok');
        }
    });
}

module.exports = {
    getRemoteLocation: getRemoteLocation,
    shareLocation: shareLocation
};