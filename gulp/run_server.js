module.exports = function (gulp) {
    var nodemon = require('gulp-nodemon');

    gulp.task('run-server-test', function () {
        nodemon({
            script: 'server.js',
            env: {
                'NODE_ENV': 'test'
            },
            nodeArgs: ['--debug'],
            watch: ['none']
        });
    });
    gulp.task('run-server-dev', function () {
        return nodemon({
            script: 'server.js',
            env: {
                'NODE_ENV': 'dev',
                'DB_CONNECTION': 'dev_remote',
                'PORT': 8200
            },
            nodeArgs: ['--debug'],
            watch: ['none']
        });
    });

};