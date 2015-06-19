"use strict";

var pool = require('../../db-pool'),
    utils = require('../../utils');

function getUser(params, callback) {
    pool.getConnection(function (connection) {
        var query = " SELECT * FROM user" +
            " WHERE" +
            " username = '" + params.username + "'";

        connection.query(query, function (err, users) {
            connection.release();
            if (err) {
                callback(err, false);
            } else if (users instanceof Array && users.length > 0) {
                callback(null, users[0]);
            } else {
                callback(null, false);
            }
        });
    }, callback)
}

function getAllUsers(callback) {
    pool.getConnection(function (connection) {
        var query = " SELECT" +
            " u.id, u.username, u.last_date_activity AS lastDateActivity, us.name AS status" +
            " FROM user" +
            " AS u" +
            " JOIN" +
            " user_status as us" +
            " ON" +
            " us.id=u.user_status_id";

        connection.query(query, function (err, users) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        });
    }, callback)
}

function createUser(params, callback) {
    pool.getConnection(function (connection) {
        var userQuery,
            userDetailsQuery,
            salt = Math.random() + '';

        userQuery = "INSERT INTO user" +
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

        connection.beginTransaction(function (err) {
            if (err) {
                callback(err, null);
            }
            connection.query(userQuery, function (err, user) {
                if (err) {
                    connection.rollback(function () {
                        throw err;
                    });
                    callback(err, null);
                } else {
                    userDetailsQuery = "INSERT INTO user_details" +
                    "(" +
                    "email," +
                    "user_id" +
                    ")" +

                    "VALUES" +

                    "(" +
                    "'" + params.email + "'" +
                    "," + user.insertId +
                    ")";

                    connection.query(userDetailsQuery, function (err, userDetails) {
                        if (err) {
                            connection.rollback(function () {
                                throw err;
                            });
                            callback(err, null);
                        } else {
                            connection.commit(function (err) {
                                if (err) {
                                    connection.rollback(function () {
                                        throw err;
                                    });
                                }
                                connection.release();
                                callback(null, {
                                    id: user.insertId,
                                    status: 'active',
                                    lastDateActivity: utils.getFormattedDate(new Date())
                                });
                            });
                        }
                    });
                }
            });
        });
    }, callback)
}

function setNetworkStatus(params, callback) {
    pool.getConnection(function (connection) {
        var query = " UPDATE user" +
            " SET network_status=" + params.networkStatus +
            " WHERE" +
            " username='" + params.username + "'";

        connection.query(query, function (err, result) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, "network status is updated");
            }
        });
    }, callback)
}

function getUserById(id, done) {
    pool.getConnection(function (connection) {
        var query = " SELECT * FROM user" +
            " WHERE" +
            " id= " + id;

        connection.query(query, function (err, users) {
            connection.release();
            if (err) {
                done(err, null);
            } else if (users instanceof Array && users.length > 0) {
                done(null, users[0]);
            } else {
                done(null, "user not found");
            }
        });
    }, done)
}

function deleteUser(id, done) {
    pool.getConnection(function (connection) {
        var query = " UPDATE user" +
            " SET user_status_id=1" +
            " WHERE" +
            " id=" + id;

        connection.query(query, function (err, result) {
            connection.release();
            if (err) {
                done(err, null);
            } else {
                done(null, {result: result, message: "user marked as deleted"});
            }
        });
    }, done)
}

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    setNetworkStatus: setNetworkStatus,
    deleteUser: deleteUser
};