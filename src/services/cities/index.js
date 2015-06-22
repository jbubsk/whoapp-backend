"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils');

function getCityIdByName(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            getCityId
        ],
        utils.handleDbQuery(done));

    function getCityId(conn, callback) {
        var query = "SELECT id FROM city" +
            " WHERE" +
            " name_ru='" + params.name + "'";

        conn.query(query, function (err, cityId) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, cityId);
            }
        });
    }
}

function getCitiesByName(searchText, done) {

    async.waterfall(
        [
            pool.getConnection,
            getCities
        ],
        utils.handleDbQuery(done));

    function getCities(conn, callback) {
        var query = "SELECT name_ru AS nameRu, district_ru AS districtRu, id FROM city" +
            " WHERE" +
            " name_ru LIKE '" + searchText + "%'";

        conn.query(query, function (err, cities) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, cities);
            }
        });
    }
}

module.exports = {
    getCityIdByName: getCityIdByName,
    getCitiesByName: getCitiesByName
};