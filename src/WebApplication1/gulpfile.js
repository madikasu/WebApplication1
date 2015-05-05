
/// <binding AfterBuild='copy' Clean='clean' />

//var gulp = require("gulp"),
//  rimraf = require("rimraf"),
//  fs = require("fs"),
//  uglify = require('gulp-uglify'),
//  concat = require('gulp-concat'),
//  ts = require("gulp-typescript"),
//  es = require("event-stream");

//var sourcemaps = require('gulp-sourcemaps');



var gulp = require('gulp'),rimraf = require("rimraf"), fs = require('fs');
var gutil = require('gulp-util');
var wrench = require('wrench');
var path = require('path');

eval("var project = " + fs.readFileSync("./project.json"));

var paths = {
  bower: "./bower_components/",
  lib: "./" + project.webroot + "/lib/",
  script: "./" + project.webroot + "/scripts/",
  tmp: './.tmp/'
};


var options = {
    output: paths,
    bower: path.join(process.cwd(),'./bower.json'),
    scripts: 'scripts',
    errorHandler: function (title) {
        return function (err) {
            gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
            this.emit('end');
        };
    }
};


wrench.readdirSyncRecursive('./gulp').filter(function (file) {
    return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
    require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
})

//var tsProject = ts.createProject({
//    target: 'ES5',
//    typescript: require('typescript'),
//    sortOutput: true
//});

//gulp.task("clean", function (cb) {
//  return rimraf(paths.lib, cb);
//});


//gulp.task('scripts', ['clean'], function () {

//    return gulp.src('scripts/**/*.ts')
//        .pipe(sourcemaps.init())
//        .pipe(ts(tsProject))
//    .pipe(concat('all.min.js'))
//    .pipe(uglify())
//    .pipe(sourcemaps.write())
//    .pipe(gulp.dest(paths.script));
//})



//gulp.task("copy", ["clean"], function () {
//  var bower = {
//    "bootstrap": "bootstrap/dist/**/*.{js,map,css,ttf,svg,woff,eot}",
//    "bootstrap-touch-carousel": "bootstrap-touch-carousel/dist/**/*.{js,css}",
//    "hammer.js": "hammer.js/hammer*.{js,map}",
//    "jquery": "jquery/jquery*.{js,map}",
//    "jquery-validation": "jquery-validation/jquery.validate.js",
//    "jquery-validation-unobtrusive": "jquery-validation-unobtrusive/jquery.validate.unobtrusive.js",
//    "angular": "angular/angular*.{js,map,css}"
//  }

//  for (var destinationDir in bower) {
//    gulp.src(paths.bower + bower[destinationDir])
//      .pipe(gulp.dest(paths.lib + destinationDir));
//  }
//});

//gulp.task('watch', function () {
//    gulp.watch('scripts/**/*.{js,ts}', ['scripts']);
//})