module.exports = function (gulp) {
    var mocha = require('gulp-mocha');

    function runMocha() {
        return gulp.src('test/*.js', {read: false})
            .pipe(mocha({reporter: 'spec'}));
    }

    gulp.task('tests', function () {
        process.env.DB_CONNECTION = 'test_remote';


        gulp.watch(['src/**/*.js', '*.js', 'test/mongoose.js'], function () {
            runMocha();
        });
        return runMocha();
    });
};