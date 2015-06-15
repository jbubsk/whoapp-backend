"use strict";

var userService = require('../../../services/users');

function createUser(req, res) {
    userService.createUser(req.body, function (err, result) {
        if (err) {
            res.status(400).json({error: err});
        } else {
            res.json({result: result});
        }
    })
}

function getAllUsers(req, res) {
    userService.getAllUsers(function (err, result) {
        if (err) {
            res.status(400).json({error: err});
        } else {
            res.json({result: result});
        }
    })
}

function deleteUser(req, res) {
    userService.deleteUser(req.params.id, function (err, result) {
        if (err) {
            res.status(400).json({error: err});
        } else {
            res.json({result: result});
        }
    })
}
module.exports = {
    createUser: createUser,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser
};