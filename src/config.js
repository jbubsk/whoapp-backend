var db_name = {
    development: 'whoapp_dev',
    test: 'whoapp_test'
};

module.exports = {
    port: process.env.OPENSHIFT_NODEJS_PORT || 8085,
    ip_address: process.env.OPENSHIFT_NODEJS_IP || '172.16.16.114',
    //debug: process.env.NODE_ENV !== 'production' ? ['ComQueryPacket', 'RowDataPacket'] : false,
    sessionIdCookie: 'ssid',
    database: {
        schema: db_name[process.env.NODE_ENV],
        host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
        port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
        user: process.env.OPENSHIFT_MYSQL_DB_USERNAME,
        password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
        poolSize: 100
    },
    secret: 'spp11Q_5zorro',
    jwtExpirationInMinutes: process.env.JWT_TOKEN_EXPIRATION || 10
};