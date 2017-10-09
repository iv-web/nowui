'use strict';

var browserSync = require('browser-sync').create();
var Path = require('path');
var gulp = require('gulp');

gulp.task('server', ['sass', 'watch'], function() {
  browserSync.init({
      server: "./dev",
      port: 80
  })
});

module.exports = browserSync;