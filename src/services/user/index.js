var crypto = require('crypto'),
    pool   = require('../../db_pool');

function getUser(params, callback) {
    pool.getConnection(function (connection) {
        var username = params.username,
            query = "SELECT * FROM user " +
                "WHERE " +
                "username = '" + username + "'";

        connection.query(query, function (err, users) {
            connection.release();
            if (err) {
                callback(err, null);
            } else if (users instanceof Array && users.length > 0) {
                callback(null, users[0]);
            } else {
                callback(null, {msg : 'user not found'});
            }
        });
    }, callback)
}

function login(params, callback) {
    if (!params.password) {
        callback({error : {message : 'password is required'}}, null);
    } else {
        getUser(params, function (err, user) {
            if (err) {
                callback(err, null);
            } else if (user.salt && checkPassword(params.password, user)) {
                callback(null, user);
            } else {
                callback({status : 401}, null);
            }
        });
    }
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
        ",'" + encryptPwd(params.password, salt) + "'" +
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
                                console.log('Transaction Complete.');
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

function checkPassword(password, user) {
    return encryptPwd(password, user.salt) === user.password;
}

function encryptPwd(password, salt) {
    return crypto.createHmac('sha1', salt).update(password).digest('hex');
}

module.exports = {
    login      : login,
    createUser : createUser,
    getUser    : getUser
};