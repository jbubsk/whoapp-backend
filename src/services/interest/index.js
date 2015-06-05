var pool = require('../../db_pool');

function addInterest(name, callback) {
    pool.getConnection(function (connection) {
        var query = "INSERT INTO interest" +
            " (name)" +
            " values" +
            " ('" + name + "')";

        connection.query(query, function (err) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, "interest is added");
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
            if (err) {
                callback(err, null);
            } else {
                callback(null, interest);
            }
        });
    }, callback)
}

function getAllInterests(callback){
    pool.getConnection(function (connection) {
        var query = "SELECT * FROM interest";

        connection.query(query, function (err, interests) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, interests);
            }
        });
    }, callback)
}

module.exports = {
    addInterest      : addInterest,
    getInterestByName: getInterestByName,
    getInterestById  : getInterestById,
    getAllInterests  : getAllInterests
};