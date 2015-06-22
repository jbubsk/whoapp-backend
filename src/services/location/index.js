"use strict";

var poolConnection = require('../../db-pool');

function getLocation(callback) {
    //User.find({online: true}, 'username latitude longitude', function (err, location) {
    //    if (err) {
    //        callback(err, null);
    //    } else {
    //        callback(null, location);
    //    }
    //});
}

function setLocation(params, callback) {
    var query = '';

    poolConnection.getConnection(function (connection) {
        connection.query(query, function (err, result) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, {});
            }

        });
    }, callback)
}

module.exports = {
    getLocation: getLocation,
    setLocation: setLocation
};