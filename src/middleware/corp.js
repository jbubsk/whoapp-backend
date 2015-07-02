module.exports = function (logger) {
    return function (req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (logger && req.method !== 'OPTIONS') {
            logger.trace(req.method + ':' + req.originalUrl, {userAgent: req.headers['user-agent'], remoteAddress: ip});
        }

        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control, Authorization");

        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
    }
};