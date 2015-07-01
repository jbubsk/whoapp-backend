var logger = require('../../../logger-winston'),
    cityService = require('../../../services/cities/index');

function getCityIdByName(req, res, next) {
    cityService.getCityIdByName(req.query, function (err, cityId) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: cityId});
        }
    })
}

function getCitiesByName(req, res, next) {
    cityService.getCitiesByName(req.params.name, function (err, cities) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: cities});
        }
    })
}

module.exports = {
    getCityIdByName: getCityIdByName,
    getCitiesByName: getCitiesByName
};