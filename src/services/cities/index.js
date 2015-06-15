"use strict";

var pool = require('../../db_pool'),
    logger = require('../../logger-winston');

function getCityIdByName(params, callback) {
    pool.getConnection(function (connection) {
        var query = "SELECT id FROM city" +
            " WHERE" +
            " name_ru='" + params.name + "'";

        connection.query(query, function (err, cityId) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                logger.debug(cityId);
                callback(null, cityId);
            }
        });
    }, callback);
}

function getCitiesByName(searchText, callback) {
    pool.getConnection(function (connection) {
        var query = "SELECT name_ru AS nameRu, district_ru AS districtRu, id FROM city" +
            " WHERE" +
            " name_ru LIKE '" + searchText + "%'";

        connection.query(query, function (err, cities) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, cities);
            }
        });
    }, callback);
}

module.exports = {
    getCityIdByName: getCityIdByName,
    getCitiesByName: getCitiesByName
};