var fs = require('fs'),
    config;

config = JSON.parse(fs.readFileSync('./app.config.json'));

module.exports = config;