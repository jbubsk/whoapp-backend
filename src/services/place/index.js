"use strict";

var pool = require('../../db_pool'),
    logger = require('../../logger-winston');

function addPlace(params, callback) {
    pool.getConnection(function (connection) {
        var placeQuery,
            placeDetailsQuery,
            placeStatusId = 3;  // inactive

        placeQuery = "INSERT INTO place" +
        " (" +
        "name," +
        "place_status_id" +
        ")" +
        " values" +
        " (" +
        "'" + params.name + "'" +
        "," + placeStatusId +
        ")";

        connection.beginTransaction(function (err) {
            connection.query(placeQuery, function (err, place) {
                if (err) {
                    callback(err, null);
                } else {
                    placeDetailsQuery = "INSERT INTO place_details" +
                    " (" +
                    "description" +
                    ",address" +
                    ",place_id" +
                    ",city_id" +
                    ")" +
                    " values" +
                    " (" +
                    "'" + (params.description || '') + "'" +
                    ",'" + params.address + "'" +
                    "," + place.insertId +
                    "," + params.city_id +
                    ")";

                    logger.log(placeDetailsQuery);
                    connection.query(placeDetailsQuery, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, result);
                            connection.commit();
                            logger.debug('place "' + params.name + '" is added');
                        }
                    });
                }
            });
        })
    }, callback);
}

function getAllPlaces(callback) {
    var query = "SELECT p.name, pd.description, c.name_ru, pd.address" +
        " FROM" +
        " place as p" +
        " JOIN" +
        " place_details as pd" +
        " JOIN" +
        " city as c" +
        " ON p.id = pd.place_id" +
        " AND" +
        " c.id = pd.city_id";

    pool.getConnection(function (connection) {
        connection.query(query, function (err, places) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, places);
            }
        });
    }, callback)
}

module.exports = {
    addPlace: addPlace,
    getAllPlaces: getAllPlaces
};