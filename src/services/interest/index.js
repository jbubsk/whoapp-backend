var pool = require('../../db_pool');

function addItem(name, callback) {
    pool.getConnection(function (connection) {
        var query = "INSERT INTO interest" +
            " (name)" +
            " values" +
            " ('" + name + "')";

        connection.query(query, function (err, interest) {
            connection.release();
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
    }, callback)
}

function getInterestByName(name, callback) {
    pool.getConnection(function (connection) {
        var query = "SELECT * FROM interest" +
            " WHERE" +
            " name='" + name + "'";

        connection.query(query, function (err, interest) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interest.length > 0 ? interest[0] : null);
            }
        });
    }, callback)
}

function getInterestById(id, callback) {
    pool.getConnection(function (connection) {
        var query = "SELECT * FROM interest" +
            " WHERE" +
            " id=" + id;

        connection.query(query, function (err, interest) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interest);
            }
        });
    }, callback)
}

function getAllInterests(callback) {
    pool.getConnection(function (connection) {
        var query = "SELECT * FROM interest";

        connection.query(query, function (err, interests) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, interests);
            }
        });
    }, callback)
}

function deleteItem(id, callback) {
    pool.getConnection(function (connection) {
        var query = "DELETE FROM interest WHERE id=" + id;

        connection.query(query, function (err, result) {
            connection.release();
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }, callback)
}

module.exports = {
    addItem: addItem,
    getInterestByName: getInterestByName,
    getInterestById: getInterestById,
    getAllInterests: getAllInterests,
    deleteItem: deleteItem
};