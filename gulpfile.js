require('./gulp/dist');
require('./gulp/complieJS');
require('./gulp/complieSass');
require('./gulp/complieCss');
require('./gulp/watch');

const gulp = require('gulp');

gulp.task('default', ['watch']);
