var morgan          = require('morgan'),
    mkdirp          = require('mkdirp'),
    fs              = require('fs'),
    path            = require('path'),
    accessLogStream = null,
    loggerFormat    = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status length: :res[content-length] ":referrer" ":user-agent"';

mkdirp('./logs', function (err) {
    if (err) {
        logger.error(err);
    }
});

accessLogStream = fs.createWriteStream(path.join() + '/logs/access.log', {
    flags : 'a'
});


module.exports = function () {
    return morgan(loggerFormat, {
        stream : accessLogStream,
        skip   : function (req, res) {
            return res.statusCode < 400
        }
    })
};