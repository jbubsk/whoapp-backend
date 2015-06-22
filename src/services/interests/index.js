"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils');

function addItem(name, done) {

    async.waterfall(
        [
            pool.getConnection,
            addInterest
        ],
        utils.handleDbQuery(done)
    );

    function addInterest(conn, callback) {
        var query = "INSERT INTO interest" +
            " (name)" +
            " values" +
            " ('" + name + "')";

        conn.query(query, function (err, interest) {
            conn.release();
            if (err) {
                if (err.errno === 1062 || err.code === "ER_DUP_ENTRY") {
                    callback({errorCode: err.errno}, null);
                } else {
                    callback(err, null);
                }
            } else {
                callback(null, {id: interest.insertId});
            }
        });
    }
}

function getInterestByName(name, done) {

    async.waterfall(
        [
            pool.getConnection,
            getInterest
        ],
        utils.handleDbQuery(done)
    );

    function getInterest(conn, callback) {
        var query = "SELECT * FROM interest" +
            " WHERE" +
            " name='" + name + "'";

        conn.query(query, function (err, interest) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interest.length > 0 ? interest[0] : null);
            }
        });
    }
}

function getInterestById(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            getInterest
        ],
        utils.handleDbQuery(done)
    );

    function getInterest(conn, callback) {
        var query = "SELECT * FROM interest" +
            " WHERE" +
            " id=" + id;

        conn.query(query, function (err, interest) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interest);
            }
        });
    }
}

function getAllInterests(done) {

    async.waterfall(
        [
            pool.getConnection,
            addInterests
        ],
        utils.handleDbQuery(done)
    );

    function addInterests(conn, callback) {
        var query = "SELECT * FROM interest";

        conn.query(query, function (err, interests) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interests);
            }
        });
    }
}

function deleteItem(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            deleteInterest
        ],
        utils.handleDbQuery(done)
    );

    function deleteInterest(conn, callback) {
        var query = "DELETE FROM interest WHERE id=" + id;

        conn.query(query, function (err, result) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
}

module.exports = {
    addItem: addItem,
    getInterestByName: getInterestByName,
    getInterestById: getInterestById,
    getAllInterests: getAllInterests,
    deleteItem: deleteItem
};