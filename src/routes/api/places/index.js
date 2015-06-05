var logger = require('../../../logger-winston'),
    placesService = require('../../../services/place/index');

function getPlaces(req, res, next) {
    placesService.getAllPlaces(function (err, places) {
        if (err) {
            res.status(err.status || 400).send({err: err});
        } else {
            res.json({result: places});
        }
    })
}

function addPlace(req, res, next) {
    placesService.addPlace(req.body, function (err, result) {
        if (err) {
            res.status(err.status || 400).send({err: err});
        } else {
            res.json({result: result});
        }
    })
}

module.exports = {
    getPlaces: getPlaces,
    addPlace:addPlace
};