module.exports = function (gulp) {
    var nodemon = require('gulp-nodemon');

    gulp.task('run-server-dev-debug', function () {
        return nodemon({
            script: 'server.js',
            env: {
                'NODE_ENV': 'development',
                'PORT': 8085
            },
            nodeArgs: ['--debug=5858'],
            watch: ['none']
        });
    });
    gulp.task('run-server-dev', function () {
        return nodemon({
            script: 'server.js',
            env: {
                'NODE_ENV': 'development',
                'PORT': 8085
            },
            watch: ['none']
        });
    });

};