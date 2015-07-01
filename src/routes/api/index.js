var express = require('express'),
    router = express.Router(),
    authorization = require('./authentication/index'),
    location = require('./location/index'),
    interests = require('./interests/index'),
    cities = require('./cities/index'),
    places = require('./places/index'),
    users = require('./users/index');

if (process.env.NODE_ENV !== 'test') {
    router.use(authorization);
}

router.get('/users', users.getAllUsers);
router.post('/users', users.createUser);
router.delete('/users/:id', users.deleteUser);

router.get('/location', location.getLocation);
router.post('/location', location.setLocation);

router.get('/interests', interests.getAll);
router.post('/interests', interests.add);
router.put('/interests', interests.update);
router.delete('/interests/:id', interests.remove);

router.get('/places', places.getPlaces);
router.get('/places/:id', places.getPlace);
router.post('/places', places.addPlace);
router.put('/places/:id', places.updatePlace);
router.delete('/places/:id', places.deletePlace);

router.get('/cities/:name', cities.getCitiesByName);

module.exports = router;