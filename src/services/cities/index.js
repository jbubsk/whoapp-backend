"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils'),
    handleQuery = utils.handleQuery;

function getCityIdByName(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            getCityId
        ],
        utils.handleDbOperation(done));

    function getCityId(conn, callback) {
        var query = "SELECT id FROM city" +
            " WHERE" +
            " name_ru='" + params.name + "'";

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function getCitiesByName(searchText, done) {

    async.waterfall(
        [
            pool.getConnection,
            getCities
        ],
        utils.handleDbOperation(done));

    function getCities(conn, callback) {
        var query = "SELECT name_ru AS nameRu, district_ru AS districtRu, id FROM city" +
            " WHERE" +
            " name_ru LIKE '" + searchText + "%'";

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

module.exports = {
    getCityIdByName: getCityIdByName,
    getCitiesByName: getCitiesByName
};