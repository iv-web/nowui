'use strict';

var gulp      = require('gulp');
var through   = require("through2");
var chalk     = require("chalk");
var newer     = require("gulp-newer");
var babel     = require("gulp-babel");
var watch     = require("gulp-watch");
var gutil     = require("gulp-util");
var Path      = require('path');
var plumber   = require('gulp-plumber');

var scripts = "./packages/*/*/src/**/*.js";
var dest = "packages";

var srcEx, libFragment;
if (Path.win32 === Path) {
  srcEx = /(packages\\[^\\]+\\\[^\\]+)\\src\\/;
  libFragment = "$1\\lib\\"
} else {
  srcEx = new RegExp("(packages/[^/]+/[^/]+)/src/");
  libFragment = "$1\\lib/"
}

gulp.task("js", function () {
  return gulp.src(scripts)
    
    .pipe(plumber({
      errorHandler: function (err) {
        gutil.log(err.stack)
      }
    }))
    .pipe(through.obj(function (file, enc, callback) {
      file._path = file.path;
      file.path = file.path.replace(srcEx, libFragment);
      callback(null, file)
    }))
    .pipe(newer(dest))
    .pipe(through.obj(function (file, enc, callback) {
      gutil.log("Compiling", "'" + chalk.cyan(file._path) + "'...");
      callback(null, file)
    }))
    .pipe(babel({
      presets: ['react', ['es2015', {'loose': true}], 'stage-0'],
      plugins: ['syntax-dynamic-import']
    }))
    .pipe(gulp.dest(dest))
});

module.exports = scripts;
