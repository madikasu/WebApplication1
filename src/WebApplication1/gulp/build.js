'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {
    gulp.task('clean', ['tsd:purge'], function (done) {
        $.del([options.output.tmp], done);
    });
}