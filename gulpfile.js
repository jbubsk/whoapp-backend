var gulp = require('gulp');

require('./gulp/run_server')(gulp);
require('./gulp/test')(gulp);
require('./gulp/database')(gulp);

gulp.task('default', function () {
    gulp.start('run-server-dev');
});

gulp.task('dev_debug', function () {
    gulp.start('run-server-dev-debug');
});