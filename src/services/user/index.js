var pool = require('../../db_pool'),
    utils = require('../../utils');

function getUser(params, callback) {
    pool.getConnection(function (connection) {
        var query = " SELECT * FROM user" +
            " WHERE" +
            " username = '" + params.username + "'";

        connection.query(query, function (err, users) {
            connection.release();
            if (err) {
                callback(err, null);
            } else if (users instanceof Array && users.length > 0) {
                callback(null, users[0]);
            } else {
                callback(null, null);
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
        "," + 2 +
        "," + 2 +
        ")";

        connection.beginTransaction(function (err) {
            if (err) {
                throw err
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

                    connection.query(userDetailsQuery, function (err, user) {
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
                                callback(null, "user is created");
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
            " SET network_status=" + params.network_status +
            " WHERE" +
            " username='" + params.username + "'";

        connection.query(query, function (err, result) {
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

module.exports = {
    createUser: createUser,
    getUser: getUser,
    getUserById: getUserById,
    setNetworkStatus: setNetworkStatus
};