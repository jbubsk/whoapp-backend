var gulp = require('gulp-help')(require('gulp'));

require('./gulp/build')(gulp);
require('./gulp/run-server')(gulp);
require('./gulp/test')(gulp);

gulp.task('default', function () {
    console.log("********** Hello from Gulp! **********");
});

gulp.task('dev', ['build-config'], function () {
    gulp.start('run-server-dev');
});

gulp.task('dev_debug', ['build-config'], function () {
    gulp.start('run-server-dev-debug');
});