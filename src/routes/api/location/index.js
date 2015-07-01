var locationServices = require('../../../services/location');

function getLocation(req, res, next) {

    req.body.username = req.session.username;

    locationServices.getLocation(req.body, function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        }
        res.json({
            result: result
        });
    });
}

function setLocation(req, res, next) {

    req.body.userId = req.user.id;

    locationServices.setLocation(req.body, function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        }
        res.json({
            result: result
        });
    });
}

module.exports = {
    getLocation: getLocation,
    setLocation: setLocation
};