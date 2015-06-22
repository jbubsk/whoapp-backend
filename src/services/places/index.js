"use strict";

var pool = require('../../db-pool'),
    logger = require('../../logger-winston'),
    async = require('async'),
    utils = require('../../utils');

function addPlace(params, done) {

    async.waterfall(
        [
            pool.getTransactionalConnection,
            insertPlace,
            insertPlaceDetails,
            insertPlaceLocation
        ],
        utils.handleTrxDbQuery(done));

    function insertPlace(conn, callback) {
        var placeStatusId = 3,  // inactive
            query = "INSERT INTO place" +
                " (" +
                "name," +
                "place_status_id" +
                ")" +
                " values" +
                " (" +
                "'" + params.name + "'" +
                "," + placeStatusId +
                ")";

        conn.query(query, function (err, place) {
            if (err) {
                callback(err, conn, null);
            } else {
                callback(null, conn, place.insertId);
            }
        });
    }

    function insertPlaceDetails(conn, placeId, callback) {
        var query = "INSERT INTO place_details" +
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
            "," + placeId +
            "," + params.cityId +
            ")";

        conn.query(query, function (err) {
            if (err) {
                callback(err, conn, null);
            } else {
                callback(null, conn, placeId);
            }
        });
    }

    function insertPlaceLocation(conn, placeId, callback) {
        var query = " INSERT INTO location" +
            " (" +
            "latitude" +
            ",longitude" +
            ",place_id" +
            ")" +
            " VALUES" +
            " (" +
            params.latitude.toFixed(7) +
            "," + params.longitude.toFixed(7) +
            "," + placeId +
            ")";

        conn.query(query, function (err) {
            if (err) {
                callback(err, conn, null);
            } else {
                callback(null, conn, null);
            }
        });
    }
}

function getAllPlaces(done) {

    async.waterfall(
        [
            pool.getConnection,
            getPlaces
        ],
        utils.handleDbQuery(done));

    function getPlaces(conn, callback) {
        var query = "SELECT" +
            " p.id, p.name, pd.description, c.name_ru as city, pd.address, l.latitude, l.longitude" +
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

        conn.query(query, function (err, places) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, places);
            }
        });
    }
}

function deletePlace(placeId, done) {
    async.waterfall(
        [
            pool.getTransactionalConnection,
            deleteFromPlaceDetails,
            deleteFromPlace
        ],
        utils.handleTrxDbQuery(done));

    function deleteFromPlaceDetails(conn, callback) {
        var query = "DELETE FROM place_details" +
            " WHERE place_id=" +
            placeId;

        conn.query(query, function (err, result) {
            if (err) {
                callback(err, conn, null);
            } else {
                callback(null, conn);
            }
        });
    }

    function deleteFromPlace(conn, callback) {
        var query = "DELETE FROM place" +
            " WHERE id=" +
            placeId;

        conn.query(query, function (err, result) {
            if (err) {
                callback(err, conn, null);
            } else {
                callback(null, conn, "place is deleted");
            }
        });
    }
}

module.exports = {
    addPlace: addPlace,
    getAllPlaces: getAllPlaces,
    deletePlace: deletePlace
};