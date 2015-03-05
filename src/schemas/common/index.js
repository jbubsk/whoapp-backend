var mongoose = require('mongoose'),
    MongooseSchema = mongoose.Schema,
    extend = require('extend'),
    Schema;

Schema = extend(MongooseSchema, {});

Schema.prototype.setSetter = function(field, func) {
    var extandableField = this.paths[field];

    if (extandableField) {
        extandableField.setters.push(func);
    }
};

module.exports = Schema;
