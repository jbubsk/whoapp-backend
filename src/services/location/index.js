"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils');

function getLocation(callback) {
    //User.find({online: true}, 'username latitude longitude', function (err, location) {
    //    if (err) {
    //        callback(err, null);
    //    } else {
    //        callback(null, location);
    //    }
    //});
}

function setLocation(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            insertLocation
        ],
        utils.handleDbQuery(done)
    );
    var query = 'UPDATE location SET' +
        ' latitude=' + params.latitude +
        ',longitude=' + params.longitude +
        ' WHERE user_id=' + params.userId;

    function insertLocation(conn, callback) {
        conn.query(query, function (err, result) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, {});
            }

        });
    }
}

module.exports = {
    getLocation: getLocation,
    setLocation: setLocation
};