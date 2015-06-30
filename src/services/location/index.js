"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils'),
    handleQuery = utils.handleQuery;

function getLocation(callback) {

}

function setLocation(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            insertLocation
        ],
        utils.handleDbOperation(done)
    );

    function insertLocation(conn, callback) {
        var query = 'UPDATE location SET' +
            ' latitude=' + params.latitude +
            ',longitude=' + params.longitude +
            ' WHERE user_id=' + params.userId;

        conn.query(query, handleQuery(conn, callback));
    }
}

module.exports = {
    getLocation: getLocation,
    setLocation: setLocation
};