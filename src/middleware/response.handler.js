'use strict';

var logger = require('../logger-winston');

module.exports = function (req, res, next) {
    return function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: result});
        }
    }
};