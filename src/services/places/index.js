"use strict";

var pool = require('../../db-pool'),
    logger = require('../../logger-winston'),
    async = require('async'),
    utils = require('../../utils');

/*
 * params: [name,description,address,cityId,latitude,longitude,interestsIds]
 *
 * */
function addPlace(params, done) {

    async.waterfall(
        [
            pool.getTransactionalConnection,
            insertPlace,
            insertPlaceDetails,
            insertPlaceLocation,
            _insertPlaceInterest
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
                callback(err, conn);
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
                callback(err, conn);
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
            params.latitude +
            "," + params.longitude +
            "," + placeId +
            ")";

        conn.query(query, function (err) {
            if (err) {
                callback(err, conn);
            } else {
                callback(null, conn, placeId, params.interestsIds);
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

function getPlace(placeId, done) {
    async.waterfall(
        [
            pool.getConnection,
            getPlaceById
        ],
        utils.handleDbQuery(done));

    function getPlaceById(conn, callback) {
        var query = "SELECT p.id, p.name, ps.name as status, pd.address, pd.description, pd.site, pd.phone, pd.proposition, GROUP_CONCAT(i.id) as interestsIds" +
            " FROM place as p" +
            " JOIN place_status as ps" +
            " ON p.place_status_id=ps.id" +
            " JOIN place_details as pd" +
            " ON p.id=pd.place_id" +
            " LEFT JOIN place_interest as pi" +
            " ON p.id=pi.place_id" +
            " LEFT JOIN interest as i" +
            " ON i.id=pi.interests_id" +
            " WHERE p.id=" + placeId;

        conn.query(query, function (err, place) {
            conn.release();
            if (err) {
                return callback(err, null);
            }
            return callback(null, place);
        });
    }
}

/*
 * params: [id,name,description,address,phone,site,proposition,interestsIds]
 *
 * */
function updatePlace(params, done) {
    var placeId = params.id;

    async.waterfall(
        [
            pool.getTransactionalConnection,
            updatePlaceTable,
            updatePlaceDetailsTable,
            deletePlaceInterests,
            _insertPlaceInterest
        ],
        utils.handleTrxDbQuery(done));

    function updatePlaceTable(conn, callback) {
        var query = "UPDATE place" +
            " SET" +
            " name=" + utils.str(params.name) +
            " WHERE id=" + placeId;

        conn.query(query, function (err) {
            if (err) {
                return callback(err, conn);
            }
            return callback(null, conn);
        });
    }

    function updatePlaceDetailsTable(conn, callback) {
        var query = "UPDATE place_details" +
            " SET" +
            " description=" + utils.str(params.description) +
            " ,phone=" + utils.str(params.phone) +
            " ,site=" + utils.str(params.site) +
            " ,proposition=" + utils.str(params.proposition) +
            " WHERE place_id=" + placeId;

        conn.query(query, function (err) {
            if (err) {
                return callback(err, conn);
            }
            return callback(null, conn);
        });
    }

    function deletePlaceInterests(conn, callback) {
        var deleteQuery = "DELETE FROM place_interest" +
            " WHERE place_id=" + placeId;

        conn.query(deleteQuery, function (err) {
            if (err) {
                return callback(err, conn);
            }
            return callback(null, conn, placeId, params.interestsIds);
        });
    }
}

function _insertPlaceInterest(conn, placeId, interestsIds, callback) {
    var values = '';
    if (interestsIds && interestsIds instanceof Array && interestsIds.length > 0) {

        interestsIds.forEach(function (id, index) {
            values += index === 0 ? '' : ',';
            values += ' (' + placeId + ',' + id + ')';
        });
        var query = " INSERT INTO place_interest" +
            " (" +
            "place_id" +
            ",interests_id" +
            ")" +
            " VALUES" + values;

        conn.query(query, function (err) {
            if (err) {
                return callback(err, conn);
            }
            return callback(null, conn, placeId);
        });
    } else {
        return callback(null, conn, placeId);
    }
}

module.exports = {
    addPlace: addPlace,
    getAllPlaces: getAllPlaces,
    getPlace: getPlace,
    deletePlace: deletePlace,
    updatePlace: updatePlace
};