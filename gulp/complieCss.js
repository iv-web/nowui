'use strict'

var gulp = require('gulp')
var newer = require('gulp-newer')
var browserSync = require('./server')
var src = 'src/assets/css/**/*.*(css|png|svg|jpg)'

gulp.task('css', function() {
  return gulp.src(src)
    .pipe(newer('css'))
    .pipe(gulp.dest("./dev/css"))
    .pipe(browserSync.stream())
})

module.exports = src