var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    logger = require('./src/logger-winston'),
    sockets = require('./src/sockets'),

    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('./src/middleware/session'),
    accessLogger = require('./src/middleware/access_logger'),
    corp = require('./src/middleware/corp'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,

    apiRouter = require('./src/routes/api'),
    authRouter = require('./src/routes/auth'),
    authenticationService = require('./src/services/authentication'),
    userService = require('./src/services/user');

passport.use(new LocalStrategy(authenticationService.login));

app.use(corp(logger));

app.use(accessLogger());

app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(session());

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRouter);

app.use("/api", apiRouter);

passport.serializeUser(function (user, done) {
    logger.info('passport.serializeUser is requested');
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    logger.info('passport.deserializeUser is requested');
    userService.getUserById(id, function (err, user) {
        done(err, user);
    });
});

sockets.setupListeners(server);

var envLog = 'NODE_ENV:' + process.env.NODE_ENV;

logger.info(envLog);

module.exports = {
    start: function (config) {
        server.listen(config.port, config.ip_address);
        logger.info('*** HTTP Server is started on ' + config.ip_address + ' listening ' + config.port + ' ***');
    }
};