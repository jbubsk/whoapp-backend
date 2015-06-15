"use strict";

var userService = require('../../../services/user');

function createUser(req, res, next) {
    userService.createUser(req.body, function (err, result) {
        if (err) {
            res.status(400).json({error: err});
        } else {
            res.json({result: result});
        }
    })
}

function getAllUsers(req, res, next) {
    userService.getAllUsers(function (err, result) {
        if (err) {
            res.status(400).json({error: err});
        } else {
            res.json({result: result});
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers
};