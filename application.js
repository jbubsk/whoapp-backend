var express      = require('express'),
    app          = express(),
    http         = require('http'),
    server       = http.createServer(app),
    logger       = require('./src/logger-winston'),
    sockets      = require('./src/sockets'),

    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('./src/middleware/session'),
    accessLogger = require('./src/middleware/access_logger'),
    corp         = require('./src/middleware/corp'),

    apiRouter    = require('./src/routes/api'),
    authRouter   = require('./src/routes/auth');

// The middleware
app.use("/", corp(logger));

app.use("/", accessLogger());

app.use("/", bodyParser.urlencoded({
    extended : true
}));

app.use("/", bodyParser.json());

app.use("/", cookieParser());

app.use("/", session());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

sockets.setupListeners(server);

var envLog = 'NODE_ENV:' + process.env.NODE_ENV;

logger.info(envLog);

module.exports = {
    start : function (config) {
        server.listen(config.port, config.ip_address);
        logger.info('*** HTTP Server is started on ' + config.ip_address + ' listening ' + config.port + ' ***');
    }
};