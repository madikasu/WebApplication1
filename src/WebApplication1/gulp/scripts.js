'use strict';

var gulp = require('gulp');
//var browserSync = require('browser-sync');
var mkdirp = require('mkdirp');

var $ = require('gulp-load-plugins')();

module.exports = function (options) {
    gulp.task('scripts', function () {
        mkdirp.sync(options.output.tmp);

        return gulp.src(options.scripts + '/**/*.ts')
          .pipe($.sourcemaps.init())
          .pipe($.tslint())
          .pipe($.tslint.report('prose', { emitError: false }))
          .pipe($.typescript({ sortOutput: true, target: 'ES5' })).on('error', options.errorHandler('TypeScript'))
          .pipe($.sourcemaps.write())
          .pipe($.toJson({ filename: options.output.tmp + '/sortOutput.json', relative: true }))
          .pipe(gulp.dest(options.output.tmp + '/serve/'))
          //.pipe(browserSync.reload({ stream: true }))
          .pipe($.size());
    });
};
