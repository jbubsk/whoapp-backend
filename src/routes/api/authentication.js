var logger = require('../../logger-winston');

module.exports = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        logger.info("!!! not authenticated request");
        res.status(401).send({message: 'NOT_AUTHORIZED'});
    }
};