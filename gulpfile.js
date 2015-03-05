var gulp = require('gulp');

require('./gulp/run_server')(gulp);
require('./gulp/test')(gulp);
require('./gulp/config')(gulp);

gulp.task('default', ['tests'], function () {
    gulp.start('run-server-dev');
});