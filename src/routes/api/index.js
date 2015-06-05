var express = require('express'),
    router = express.Router(),
    authorization = require('./authentication/index'),
    getRemoteLocation = require('./get-remote-location/index'),
    getAllInterests = require('./interest/index'),
    cities = require('./cities/index'),
    places = require('./places/index'),
    shareLocation = require('./share-location/index');

if (process.env.NODE_ENV !== 'test') {
    router.use(authorization);
}

router.get('/locations', getRemoteLocation);
router.post('/locations', shareLocation);
router.get('/interests', getAllInterests);
router.get('/cities/:name', cities.getCitiesByName);
router.get('/places', places.getPlaces);
router.post('/places', places.addPlace);

module.exports = router;