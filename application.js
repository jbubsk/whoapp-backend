var express = require('express'),
    app = express(),
    http = require('http'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    router = require('./src/router'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    accessLogStream,
    loggerFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status length: :res[content-length] ":referrer" ":user-agent"',
    logger = require('./src/logger-winston'),
    port = process.env.PORT || 8000,
    config = require('./src/config'),
    common = require('./src/common');

mkdirp('./logs', function (err) {
    if (err) {
        logger.error(err);
    }
});

accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {
    flags: 'a'
});

app.use(function (req, res, next) {
    console.info(req.headers);
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control");

    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});

app.use(morgan(loggerFormat, {
    stream: accessLogStream,
    skip: function (req, res) {
        return res.statusCode < 400
    }
}));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    name: config.sessionIdCookie,
    domain: '192.168.9.144',
    secret: 'jbusiki',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', router);

module.exports = {
    disconnectDB: function () {
        mongoose.disconnect();
        logger.info('Disconnected from: ' + common.getConnectionName());
    },
    connectDB: function () {
        var env = process.env.NODE_ENV,
            connectionName = common.getConnectionName();

        if (env === 'test') {
            mongoose.set('debug', true);
        }
        mongoose.connect(connectionName);
        logger.info('Connected to: ', connectionName);
    },
    stopApp: function () {
        http.close();
        logger.info('*** HTTP Server is closed ***');
    },
    startExpress: function () {
        http.createServer(app).listen(port);
        logger.info('*** HTTP Server is started listening ' + port + ' ***');
    },
    instance: function () {
        return app;
    },
    instanceDB: function () {
        return mongoose;
    }
};