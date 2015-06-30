'use strict';

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils'),
    handleQuery = require('../../utils').handleQuery;

function addItem(name, done) {

    async.waterfall(
        [
            pool.getConnection,
            addInterest
        ],
        utils.handleDbOperation(done)
    );

    function addInterest(conn, callback) {
        var query = 'INSERT INTO interest' +
            ' (name)' +
            ' VALUES' +
            ' ("' + name + '")';

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result.insertId];
        }));
    }
}

function getInterestByName(name, done) {

    async.waterfall(
        [
            pool.getConnection,
            getInterest
        ],
        utils.handleDbOperation(done)
    );

    function getInterest(conn, callback) {
        var query = 'SELECT * FROM interest' +
            ' WHERE' +
            ' name=' + utils.str(name);

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function getInterestById(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            getInterest
        ],
        utils.handleDbOperation(done)
    );

    function getInterest(conn, callback) {
        var query = 'SELECT * FROM interest' +
            ' WHERE' +
            ' id=' + id;

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function getAllInterests(done) {

    async.waterfall(
        [
            pool.getConnection,
            addInterests
        ],
        utils.handleDbOperation(done)
    );

    function addInterests(conn, callback) {
        var query = 'SELECT * FROM interest';

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function deleteItem(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            deleteInterest
        ],
        utils.handleDbOperation(done)
    );

    function deleteInterest(conn, callback) {
        var query = 'DELETE FROM interest WHERE id=' + id;

        conn.query(query, handleQuery(conn, callback));
    }
}

function updateItem(model, done) {
    async.waterfall(
        [
            pool.getConnection,
            updateInterest
        ],
        utils.handleDbOperation(done)
    );

    function updateInterest(conn, callback) {
        var query = 'UPDATE interest' +
            ' SET name=' + utils.str(model.name) +
            ' WHERE id=' + model.id;

        conn.query(query, handleQuery(conn, callback));
    }
}

module.exports = {
    add: addItem,
    update: updateItem,
    getByName: getInterestByName,
    getById: getInterestById,
    getAll: getAllInterests,
    remove: deleteItem
};