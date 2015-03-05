var config = require('./config'),
    ObjectID = require('mongodb').ObjectID;

module.exports = {

    getDate: function (ddMMyyyy) {
        var date,
            month, day, year,
            parts;

        if (typeof ddMMyyyy === 'string' && ddMMyyyy.match(/\d\d\.\d\d\.\d\d\d\d/)) {
            parts = ddMMyyyy.split('.');
            try {
                day = parts[0];
                month = parts[1];
                year = parts[2];
            } catch (error) {
                $log.error(error);
            }
            date = new Date(month + '.' + day + '.' + year).getTime();
        }
        if(typeof ddMMyyyy === 'number'){
            date = ddMMyyyy;
        }
        return date;
    },

    getConnectionName: function () {
        return config.dbConnections[process.env.DB_CONNECTION];
    },
    
    getMongoObjectId: function (hash) {
        return new ObjectID(hash);
    }
};