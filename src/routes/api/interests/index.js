"use strict";

var service = require('../../../services/interests');

function getAll(req, res, next) {
    service.getAll(function (err, interests) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: interests});
        }
    });
}

function deleteItem(req, res, next) {
    service.remove(req.params.id, function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: "interest is deleted"});
        }
    });
}

function addItem(req, res, next) {
    service.add(req.body.name, function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: result});
        }
    });
}

function update(req, res) {
    service.update(req.body, function (err, result) {
        if (err) {
            res.status(err.status || 400).json({message: err.message, code: err.code});
        } else {
            res.json({result: result});
        }
    })
}

module.exports = {
    getAll: getAll,
    remove: deleteItem,
    add: addItem,
    update: update
};