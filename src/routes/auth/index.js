"use strict";

var express = require('express'),
    router = express.Router(),
    signup = require('./signup'),
    login = require('./login'),
    logout = require('./logout'),
    logger = require('../../logger-winston');

router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signup);

module.exports = router;