var locationServices = require('../../../services/location');

function getRemoteLocation(req, res, next) {

    locationServices.getRemoteLocation(function (err, result) {
        if (err) {
            next(err);
        }
        res.json({
            result: result
        });
    });
}

module.exports = getRemoteLocation;