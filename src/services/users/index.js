"use strict";

var pool = require('../../db-pool'),
    async = require('async'),
    utils = require('../../utils');

function getUser(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            findUser
        ],
        utils.handleDbQuery(done)
    );

    function findUser(conn, callback) {
        var query = " SELECT u.username, u.network_status" +
            " FROM user as u" +
            " LEFT JOIN" +
            " location as l" +
            " ON u.id=l.user_id" +
            " WHERE" +
            " username = '" + params.username + "'";

        conn.query(query, function (err, users) {
            conn.release();
            if (err) {
                callback(err, false);
            } else if (users instanceof Array && users.length > 0) {
                callback(null, users[0]);
            } else {
                callback(null, false);
            }
        });
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
        utils.handleDbQuery(done)
    );

    function getUsers(conn, callback) {
        var query = " SELECT" +
            " u.id, u.username, u.last_date_activity AS lastDateActivity, us.name AS status" +
            " FROM user" +
            " AS u" +
            " JOIN" +
            " user_status as us" +
            " ON" +
            " us.id=u.user_status_id";

        conn.query(query, function (err, users) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        });
    }
}

function createUser(params, done) {

    async.waterfall(
        [
            pool.getTransactionalConnection,
            insertUser,
            insertUserDetails
        ],
        utils.handleTrxDbQuery(done));

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

        conn.query(query, function (err, user) {
            if (err) {
                return callback(err, conn, null);
            }
            return callback(null, conn, user.insertId);
        });
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

        conn.query(query, function (err, userDetails) {
            if (err) {
                return callback(err, conn, null);
            }
            return callback(null, conn, {
                id: userId,
                status: 'active',
                lastDateActivity: utils.getFormattedDate(new Date())
            });
        });
    }
}

function setNetworkStatus(params, done) {

    async.waterfall(
        [
            pool.getConnection,
            setNetStatus
        ],
        utils.handleDbQuery(done)
    );

    function setNetStatus(conn, callback) {
        var query = " UPDATE user" +
            " SET network_status=" + params.networkStatus +
            " WHERE" +
            " username='" + params.username + "'";

        conn.query(query, function (err, result) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, "network status is updated");
            }
        });
    }
}

function getUserById(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            getUser
        ],
        utils.handleDbQuery(done)
    );

    function getUser(conn, callback) {
        var query = " SELECT * FROM user" +
            " WHERE" +
            " id= " + id;

        conn.query(query, function (err, users) {
            conn.release();
            if (err) {
                callback(err, null);
            } else if (users instanceof Array && users.length > 0) {
                callback(null, users[0]);
            } else {
                callback(null, "user not found");
            }
        });
    }
}

function deleteUser(id, done) {

    async.waterfall(
        [
            pool.getConnection,
            deleteUserById
        ],
        utils.handleDbQuery(done)
    );

    function deleteUserById(conn, callback) {
        var query = " UPDATE user" +
            " SET user_status_id=1" +
            " WHERE" +
            " id=" + id;

        conn.query(query, function (err, result) {
            conn.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, {result: result, message: "user marked as deleted"});
            }
        });
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