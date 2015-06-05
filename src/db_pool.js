var mysql    = require('mysql'),
    config   = require('./config'),
    logger   = require('./logger-winston'),
    database = config.database;

var pool = mysql.createPool({
    connectionLimit: database.poolSize,
    host           : database.host,
    database       : database.schema,
    user           : database.user,
    password       : database.password,
    debug          : config.debug
});

var connectionLog = "Connected to DB:\n\t" +
    "host: " + pool.config.connectionConfig.host +
    "\n\tport: " + pool.config.connectionConfig.port +
    "\n\tuser: " + pool.config.connectionConfig.user +
    "\n\tdatabase: " + pool.config.connectionConfig.database;

logger.info(connectionLog);


function getConnection(successCallback, errorCallback) {

    function callback(err, connection) {
        if (err) {
            if (connection) {
                connection.release();
            }
            var errorMessage = "DB connection error";
            logger.error(errorMessage);
            errorCallback(errorMessage, null);
        } else {
            successCallback(connection);
        }
    }

    return pool.getConnection(callback);
}

module.exports = {
    getConnection: getConnection
};