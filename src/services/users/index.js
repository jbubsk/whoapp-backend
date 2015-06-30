"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils'),
    handleQuery = utils.handleQuery;

function getUser(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            findUser
        ],
        utils.handleDbOperation(done)
    );

    function findUser(conn, callback) {
        var query = " SELECT *" +
            " FROM user as u" +
                //" LEFT JOIN" +
                //" location as l" +
                //" ON u.id=l.user_id" +
            " WHERE" +
            " username = '" + params.username + "'";

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function addInterests(params, callback) {

}

function getAllUsers(done) {

    async.waterfall(
        [
            pool.getConnection,
            getUsers
        ],
        utils.handleDbOperation(done)
    );

    function getUsers(conn, callback) {
        var query = " SELECT" +
            " u.id, u.username, u.last_date_activity AS lastDateActivity, us.name AS status" +
            " ,l.latitude, l.longitude" +
            " FROM user" +
            " AS u" +
            " LEFT JOIN location as l" +
            " ON l.user_id=u.id" +
            " LEFT JOIN user_status as us" +
            " ON us.id=u.user_status_id";

        conn.query(query, handleQuery(function (users) {
            return [conn, callback, users];
        }));
    }
}

function createUser(params, done) {

    async.waterfall(
        [
            pool.getTransactionalConnection,
            insertUser,
            insertUserDetails,
            insertUserLocation
        ],
        utils.handleTrxDbOperation(done));

    function insertUser(conn, callback) {
        var query,
            salt = Math.random() + '';

        query = "INSERT INTO user" +
        "(" +
        "username," +
        "password," +
        "salt," +
        "date_creation," +
        "network_status," +
        "last_date_activity," +
        "friends_request," +
        "user_status_id," +
        "roles_group_id" +
        ")" +

        "VALUES" +

        "(" +
        "'" + params.username + "'" +
        ",'" + utils.encryptPwd(params.password, salt) + "'" +
        ",'" + salt + "'" +
        ",NOW()" +
        "," + 0 +
        ",NOW()" +
        "," + 0 +
        "," + 2 + //1-deleted, 2-active, 3-inactive
        "," + 2 +
        ")";

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result.insertId];
        }));
    }

    function insertUserDetails(conn, userId, callback) {
        var query = "INSERT INTO user_details" +
            "(" +
            "email," +
            "user_id" +
            ")" +

            "VALUES" +

            "(" +
            "'" + params.email + "'" +
            "," + userId +
            ")";

        conn.query(query, handleQuery(function () {
            return [conn, callback, userId];
        }));
    }

    function insertUserLocation(conn, userId, callback) {
        var query = "INSERT INTO location" +
            " (" +
            "latitude" +
            ",longitude" +
            ",user_id" +
            ")" +

            "VALUES" +

            " (" +
            (params.latitude || 0) +
            "," + (params.longitude || 0) +
            "," + userId +
            ")";

        conn.query(query, handleQuery(function () {
            return [conn, callback, {
                id: userId,
                status: 'active',
                lastDateActivity: utils.getFormattedDate(new Date())
            }];
        }));
    }
}

function setNetworkStatus(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            setNetStatus
        ],
        utils.handleDbOperation(done)
    );

    function setNetStatus(conn, callback) {
        var query = " UPDATE user" +
            " SET network_status=" + params.networkStatus +
            " WHERE" +
            " username='" + params.username + "'";

        conn.query(query, handleQuery(conn, callback));
    }
}

function getUserById(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            getUser
        ],
        utils.handleDbOperation(done)
    );

    function getUser(conn, callback) {
        var query = " SELECT * FROM user" +
            " WHERE" +
            " id= " + id;

        conn.query(query, handleQuery(function (result) {
            return [conn, callback, result];
        }));
    }
}

function deleteUser(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            deleteUserById
        ],
        utils.handleDbOperation(done)
    );

    function deleteUserById(conn, callback) {
        var query = " UPDATE user" +
            " SET user_status_id=1" +
            " WHERE" +
            " id=" + id;

        conn.query(query, handleQuery(conn, callback));
    }
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    setNetworkStatus: setNetworkStatus,
    deleteUser: deleteUser
};