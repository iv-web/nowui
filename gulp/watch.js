'use strict' 

var htmlSrc = require('./complieHtml')
var cssSrc = require('./complieCss')
var sassSrc = require('./complieSass')
var jsSrc = require('./complieJs')
var gulp  = require('gulp')

gulp.task('watch', ['html',  'css', 'js'], function() {
  gulp.watch(htmlSrc, ['html'])
  gulp.watch(jsSrc, {debounceDelay: 200}, ['js'])
  gulp.watch(sassSrc, ['sass'])
  gulp.watch(cssSrc, ['css'])
})

module.exports = null