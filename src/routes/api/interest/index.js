var interestService = require('../../../services/interest');

function getAllInterests(req, res, next) {
    interestService.getAllInterests(function (err, interests) {
        if (err) {
            res.status(400).send();
        } else {
            res.json({result: interests});
        }
    });
}

function deleteItem(req, res, next) {
    interestService.deleteItem(req.params.id, function (err, result) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json({result: "interest is deleted"});
        }
    });
}

function addItem(req, res, next) {
    interestService.addItem(req.body.name, function (err, result) {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json({result: result});
        }
    });
}


module.exports = {
    getAllInterests: getAllInterests,
    deleteItem: deleteItem,
    addItem: addItem
};