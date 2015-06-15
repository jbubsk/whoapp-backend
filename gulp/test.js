var mocha = require('gulp-mocha');

module.exports = function (gulp) {

    function runMocha() {
        return gulp.src('test/*.js', {read: false})
            .pipe(mocha({reporter: 'spec'}));
    }

    gulp.task('test', function () {
        process.env.NODE_ENV = 'test';


        gulp.watch(['src/**/*.js', '*.js', 'test/db_suites/*.js'], function () {
            runMocha();
        });
        return runMocha();
    });
};