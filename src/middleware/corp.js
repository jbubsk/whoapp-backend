module.exports = function (logger) {
    return function (req, res, next) {

        if (logger && req.method === 'OPTIONS') {
            if (req.headers['x-forwarded-for']) {
                logger.debug('x-forwarded-for: ' + req.headers['x-forwarded-for']);
            }
            logger.debug('user-agent: ' + req.headers['user-agent']);
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