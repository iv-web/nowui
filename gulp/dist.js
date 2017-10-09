'use strict';

require('./complieSass');

var Path    = require('path');
var fs      = require('fs');
var gulp    = require('gulp');
var newer   = require("gulp-newer");
var exec    = require('child_process').exec;

gulp.task('storybook', function(cb) {
    var babelNodePath = '/data/frontend/install/AlloyDist/runtime-now/node_modules/babel-cli/bin/babel-node.js';

    var command = 'node ' + Path.join(__dirname, '../.storybook/now-design/index.js');
    if(fs.existsSync(babelNodePath)) {
        console.log('在捷豹环境');
        command = '/root/.nvm/versions/node/v6.2.0/bin/node --harmony ' + Path.join(__dirname, '../.storybook/now-design/index.js');
    }
    console.log(command);
    var a = exec(command, {
        cwd: Path.join(__dirname, '../')
    }, function() {
        cb();
    });

    a.stdout.on('data', (data) => {
        console.log(data);
    });

    a.stderr.on('data', (data) => {
        console.log('err:' + data);
    });

    a.on('disconnect', (code) => {
        console.log('disconnect');
    });

    a.on('close', (code) => {
        console.log('close');
    });
})

gulp.task('distcss', ['sass'], function() {
  return gulp.src('src/assets/css/**/*.*(css|png|jpg|svg)')
    .pipe(newer('css'))
    .pipe(gulp.dest('./public/webserver/css'))
});

gulp.task('disthtml', ['distcss'], function() {
  return gulp.src(src)
    .pipe(newer('dist'))
    .pipe(gulp.dest('./public/webserver'))
});

gulp.task('dist', ['disthtml', 'distcss']);

var src = './src/**';