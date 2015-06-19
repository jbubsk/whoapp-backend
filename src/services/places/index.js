"use strict";

var pool = require('../../db-pool'),
    logger = require('../../logger-winston');

function addPlace(params, callback) {
    pool.getConnection(function (connection) {
        var placeQuery,
            placeDetailsQuery,
            placeLocationQuery,
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
                    "," + params.cityId +
                    ")";

                    logger.log(placeDetailsQuery);
                    connection.query(placeDetailsQuery, function (err, result) {
                        if (err) {
                            callback(err, null);
                        } else {

                            placeLocationQuery = " INSERT INTO location" +
                            " (" +
                            "latitude" +
                            ",longitude" +
                            ",place_id" +
                            ")" +
                            " VALUES" +
                            " (" +
                            params.latitude.toFixed(7) +
                            "," + params.longitude.toFixed(7) +
                            "," + place.insertId +
                            ")";

                            connection.query(placeLocationQuery, function (err, result) {
                                if (err) {
                                    callback(err, null);
                                } else {
                                    callback(null, place.insertId);
                                    connection.commit();
                                    logger.debug('place "' + params.name + '" is added');
                                }
                            });
                        }
                    });
                }
            });
        })
    }, callback);
}

function getAllPlaces(callback) {
    var query = "SELECT" +
        " p.id, p.name, pd.description, c.name_ru as city§, pd.address, l.latitude, l.longitude" +
        " FROM" +
        " place as p" +
        " JOIN" +
        " place_details as pd" +
        " JOIN" +
        " city as c" +
        " JOIN" +
        " location as l" +
        " ON" +
        " p.id = pd.place_id" +
        " AND" +
        " c.id = pd.city_id" +
        " AND" +
        " l.place_id = p.id";

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

function deletePlace(placeId, callback) {
    var queryPlace = "DELETE FROM place" +
            " WHERE id=" +
            placeId,
        queryPlaceDetails = "DELETE FROM place_details" +
            " WHERE place_id=" +
            placeId;

    pool.getConnection(function (connection) {
        connection.beginTransaction(function (beginTrxErr) {
            if (beginTrxErr) {
                callback(beginTrxErr, null);
            } else {

                connection.query(queryPlaceDetails, function (placeDetailsErr, result) {
                    if (placeDetailsErr) {
                        connection.rollback(function () {
                            callback(placeDetailsErr, null);
                        });
                    } else {

                        connection.query(queryPlace, function (placeErr, result) {
                            if (placeErr) {
                                connection.rollback(function () {
                                    callback(placeErr, null);
                                });
                            } else {

                                connection.commit(function (err) {
                                    if (err) {
                                        connection.rollback(function () {
                                            throw err;
                                        });
                                    }
                                    connection.release();
                                    callback(null, "place is deleted");
                                });
                            }
                        });
                    }
                });
            }
        });
    }, callback)
}

module.exports = {
    addPlace: addPlace,
    getAllPlaces: getAllPlaces,
    deletePlace: deletePlace
};