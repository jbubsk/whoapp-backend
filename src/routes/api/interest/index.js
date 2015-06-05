var interestService = require('../../../services/interest');

function getAllInterests(req, res, next) {
    interestService.getAllInterests(function (err, interests) {
        if (err) {
            res.status(400).send();
        } else {
            res.json({items: interests});
        }
    });
}

module.exports = getAllInterests;