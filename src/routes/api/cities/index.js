var logger = require('../../../logger-winston'),
    cityService = require('../../../services/cities/index');

function getCityIdByName(req, res, next) {
    cityService.getCityIdByName(req.query, function (err, cityId) {
        if (err) {
            res.status(err.status || 400).send({err: err});
        } else {
            res.json({result: cityId});
        }
    })
}

function getCitiesByName(req, res, next) {
    cityService.getCitiesByName(req.params.name, function (err, cityId) {
        if (err) {
            res.status(err.status || 400).send({err: err});
        } else {
            res.json({result: cityId});
        }
    })
}

module.exports = {
    getCityIdByName: getCityIdByName,
    getCitiesByName: getCitiesByName
};