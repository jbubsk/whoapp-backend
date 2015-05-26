var express           = require('express'),
    router            = express.Router(),
    authorization     = require('./authentication/index'),
    getRemoteLocation = require('./get-remote-location/index'),
    shareLocation     = require('./share-location/index');

if (process.env.NODE_ENV !== 'test') {
    router.use(authorization);
}

router.get('/getlocations', getRemoteLocation);
router.post('/sharelocation', shareLocation);

module.exports = router;