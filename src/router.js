var express = require('express'),
    router = express.Router(),
    registration = require('./routes/registration'),
    authorization = require('./routes/authorization'),
    login = require('./routes/login'),
    logout = require('./routes/logout'),
    getRemoteLocation = require('./routes/get-remote-location'),
    shareLocation = require('./routes/share-location'),
    logger = require('./logger-winston');

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