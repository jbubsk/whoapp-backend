var gulp = require('gulp-help')(require('gulp'));

require('./gulp/run-server')(gulp);
require('./gulp/test')(gulp);

gulp.task('default', function () {
    console.log("********** Hello from Gulp! **********");
});

gulp.task('dev', function () {
    gulp.start('run-server-dev');
});

gulp.task('dev_debug', function () {
    gulp.start('run-server-dev-debug');
});