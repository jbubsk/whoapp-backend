var db_name = {
    production  : 'whoapp',
    development : 'whoapp_dev',
    test        : 'whoapp_test'
};

module.exports = {
    port            : process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip_address      : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    debug           : process.env.NODE_ENV !== 'production' ? ['ComQueryPacket', 'RowDataPacket'] : false,
    sessionIdCookie : 'ssid',
    database        : {
        schema   : db_name[process.env.NODE_ENV],
        host     : process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
        port     : process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
        user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'adminigx8KXz',
        password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'MZmQCIWNAvGW',
        poolSize : 100
    }
};