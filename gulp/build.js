var fs = require('fs');

module.exports = function (gulp) {

    gulp.task('build:config', 'setup config variables', function () {
        var fileName = './app.config.json',
            db_name = {
                development: 'whoapp_dev',
                test: 'whoapp_test'
            },
            config = {
                port: process.env.OPENSHIFT_NODEJS_PORT || 8085,
                ip_address: process.env.OPENSHIFT_NODEJS_IP || '172.16.16.114',
                debug: process.env.NODE_ENV !== 'production' ? ['ComQueryPacket', 'RowDataPacket'] : false,
                sessionIdCookie: 'ssid',
                database: {
                    schema: db_name[process.env.NODE_ENV],
                    host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
                    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
                    user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
                    password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
                    poolSize: 100
                }
            };

        fs.writeFileSync(fileName, JSON.stringify(config));
    });
};
