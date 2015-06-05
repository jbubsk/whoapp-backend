"use strict";

var express = require('express'),
    router = express.Router(),
    signup = require('./signup/index'),
    login = require('./login/index'),
    logout = require('./logout/index'),
    logger = require('../../logger-winston');

router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signup);

module.exports = router;