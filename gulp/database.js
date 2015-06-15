module.exports = function (gulp) {
    var shell = require('gulp-shell');

    gulp.task('re-run', shell.task([
        'rhc app restart whoappbackend',
        'rhc port-forward whoappbackend'
    ]));

    gulp.task('forward', shell.task([
        'rhc port-forward whoappbackend'
    ]));
};