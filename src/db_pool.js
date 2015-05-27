var mysql    = require('mysql'),
    config   = require('./config'),
    logger = require('./logger-winston'),
    database = config.database;

logger.info("Connecting to DB... host: " + database.host[process.env.NODE_ENV]);

var pool = mysql.createPool({
    connectionLimit : database.poolSize,
    host            : database.host[process.env.NODE_ENV],
    database        : database.schema,
    user            : database.user,
    password        : database.password,
    debug           : config.debug
});

function getConnection(successCallback, errorCallback) {

    function callback(err, connection) {
        if (err) {
            if (connection) {
                connection.release();
            }
            errorCallback({
                "code"   : 100,
                "status" : "Error in connection database"
            }, null);
        } else {
            successCallback(connection);
        }
    }

    return pool.getConnection(callback);
}

module.exports = {
    getConnection : getConnection
};