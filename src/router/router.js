var express = require('express'),
    router = express.Router(),
    registration = require('./../routes/registration/index'),
    authorization = require('./routes/authorization'),
    login = require('./../routes/login/index'),
    logout = require('./../routes/logout/index'),
    getRemoteLocation = require('./../routes/get-remote-location/index'),
    shareLocation = require('./../routes/share-location/index'),
    logger = require('./../logger-winston');

router.use(function (req, res, next) {
    next();
});

if (process.env.NODE_ENV !== 'test') {
    router.use('/private', authorization);
}

router.post('/register', registration);
router.post('/login', login.login);
router.get('/logout', logout);

router.get('/private/getlocations', getRemoteLocation);
router.post('/private/sharelocation', shareLocation);

module.exports = router;