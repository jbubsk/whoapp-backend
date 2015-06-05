var crypto = require('crypto');

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
        if (typeof ddMMyyyy === 'number') {
            date = ddMMyyyy;
        }
        return date;
    },

    encryptPwd: function (password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    }
};