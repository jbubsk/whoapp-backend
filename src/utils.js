var crypto = require('crypto'),
    moment = require('moment'),
    logger = require('./logger-winston');

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

    getFormattedDate: function (date) {
        return moment(moment(date)).format('YYYY-MM-DD HH:mm');
    },

    encryptPwd: function (password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
    },

    handleQuery: function (getCallbackArguments) {
        var callbackArguments = arguments;
        return function (err, result) {
            var connection, callback;

            if (typeof getCallbackArguments === 'function') {
                callbackArguments = getCallbackArguments(result || {});
            }

            if (!callbackArguments instanceof Array || typeof callbackArguments === 'undefined') {
                throw new Error('callback arguments should be an Array');
            }

            if (callbackArguments.length < 2) {
                throw new Error('callback arguments should contain at least two arguments: connection, callback');
            }

            connection = callbackArguments[0];
            callback = callbackArguments[1];

            if (err) {
                logger.error({message: 'handleDbQuery', error: err});
                return callback(err, connection, null);
            }

            var args = [null, connection].concat(Array.prototype.slice.call(callbackArguments,2));
            return callback.apply(null, args);
        }
    },

    handleDbOperation: function (done) {
        return function (err, conn, result) {
            conn.release();
            if (err) {
                return done({code: err.errno, message: err.code}, null);
            }
            return done(null, result);
        };
    },

    handleTrxDbOperation: function (done) {
        return function (err, conn, result) {
            console.log('handleTrxDbOperation result:' + result);
            conn.release();
            if (err) {
                return done({code: err.errno, message: err.code}, null);
            }
            return conn.commit(function (err) {
                if (err) {
                    conn.rollback(function () {
                        throw err;
                    });
                }
                done(null, result);
            });
        }
    }
    ,

    str: function (value) {
        if (value) {
            return "'" + value + "'";
        }
        return null;
    }
}
;