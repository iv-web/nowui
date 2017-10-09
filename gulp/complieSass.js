'use strict';

var gulp = require('gulp');
var newer = require('gulp-newer');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
// var plumber = require("gulp-plumber")

var src = "src/assets/scss/**.scss";

gulp.task('sass', function() {
  return gulp.src(src)
    // .pipe(plumber({
    //     errorHandler: function (err) {
    //       gutil.log(err.stack)
    //     }
    // }))
    .pipe(newer('sass'))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['Android >= 2.3', 'iOS >= 6'],
      cascade: true
    }))
    .pipe(gulp.dest("./src/assets/css"))

});

module.exports = src;