"use strict";

var express = require('express'),
    app = express(),
    html5static = require('./src/middleware/html5static'),
    http = require('http'),
    server = http.createServer(app),
    logger = require('./src/logger-winston'),
    sockets = require('./src/sockets'),

    bodyParser = require('body-parser'),
    jwt = require('./src/middleware/check.jwt'),
    accessLogger = require('./src/middleware/access.logger'),
    corp = require('./src/middleware/corp'),

    apiRouter = require('./src/routes/api'),
    authRouter = require('./src/routes/auth');

app.use(corp());

app.use(html5static('public'));

app.use(accessLogger());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));


app.use("/auth", authRouter);

app.use("/api", jwt());

app.use("/api", apiRouter);

sockets.setupListeners(server);

var envLog = 'NODE_ENV:' + process.env.NODE_ENV;

logger.info(envLog);

module.exports = {
    start: function (config) {
        server.listen(config.port, config.ip_address);
        logger.info('HTTP Server is started on ' + config.ip_address + ' listening ' + config.port
        );
    }
};