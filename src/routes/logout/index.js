var config = require('../../config'),
    locationService = require('../../services/location');

module.exports = function (req, res, next) {

    locationService.shareLocation({username: req.session.username}, function (err, result) {
        if (err) {
            res.json({error: 'Some error occurred'});
        } else {
            delete req.session.username;
            res.json({
                result: "loggedout"
            });
        }
    });
};