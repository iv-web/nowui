'use strict';

var gulp = require('gulp');
var newer     = require("gulp-newer");

/**
 * [description]
 * @param  {[type]}  [description]
 * @param  {[type]}  [description]
 * @return {[type]}  [description]
 */
gulp.task('html', function(){
  return gulp.src(src)
    .pipe(newer('html'))
    .pipe(gulp.dest('./dev'))
});

var src = './src/*.html';

module.exports = src;