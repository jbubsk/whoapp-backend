var logger = require('../../logger-winston');

module.exports = function (req, res, next) {
    if (req.session.username) {
        next();
    } else {
        logger.info("not authenticated request: %s, session: %s", req.originalUrl, req.session);
        res.status(401).send();
    }
};