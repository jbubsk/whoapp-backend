"use strict";

var service = require('../../../services/interests');

function getAllInterests(req, res, next) {
    service.getAll(function (err, interests) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: interests});
        }
    });
}

function deleteItem(req, res, next) {
    service.remove(req.params.id, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: "interest is deleted"});
        }
    });
}

function addItem(req, res, next) {
    service.add(req.body.name, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: result});
        }
    });
}

function update(req, res) {
    service.update(req.body, function (err, result) {
        if (err) {
            res.status(err.code).json({message: err.message});
        } else {
            res.json({result: result});
        }
    })
}

module.exports = {
    getAll: getAllInterests,
    remove: deleteItem,
    add: addItem,
    update: update
};