var mysql = require('mysql'),
    database = require('./config').database,
    connection = mysql.createConnection({
        host: database.host[process.env.NODE_ENV],
        user: database.user,
        password: database.password
    });

connection.connect();

module.exports = connection;