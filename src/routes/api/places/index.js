var logger = require('../../../logger-winston'),
    placesService = require('../../../services/places/index');

function getPlaces(req, res, next) {
    placesService.getAllPlaces(function (err, places) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: places});
        }
    })
}

function addPlace(req, res, next) {
    placesService.addPlace(req.body, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: {id: result}});
        }
    })
}

function deletePlace(req, res, next) {
    placesService.deletePlace(req.params.id, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            logger.debug(result);
            res.json({result: result});
        }
    })
}

function getPlace(req, res, next) {
    placesService.getPlace(req.params.id, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            logger.debug(result);
            res.json({result: result});
        }
    })
}

function updatePlace(req, res, next) {
    placesService.updatePlace(req.body, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            logger.debug(result);
            res.json({result: result});
        }
    })
}

module.exports = {
    getPlaces: getPlaces,
    addPlace: addPlace,
    getPlace: getPlace,
    deletePlace: deletePlace,
    updatePlace: updatePlace
};