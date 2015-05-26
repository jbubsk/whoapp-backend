var locationServices = require('../../../services/location');

function shareLocation(req, res, next) {

    req.body.username = req.session.username;
    
    locationServices.shareLocation(req.body, function (err, result) {
        if (err) {
            next(err);
        }
        res.json({
            result: result
        });
    });
}

module.exports = shareLocation;