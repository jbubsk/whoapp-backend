var winston = require('winston'),
    logger;

logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            handleExceptions: false,
            json: false
        })
    ],
    exitOnError: false
});

module.exports = logger;