'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./../../config'), src = config.src;
var path = require('path');

var cwd = process.cwd();

var karma = require('karma').server;

gulp.task('ng-factory:test(src)', function() {
  karma.start({
    configFile: path.join(cwd, 'test/karma.conf.js'),
    browsers: ['PhantomJS'],
    reporters: ['dots'],
    singleRun: true
  }, function(code) {
    gutil.log('Karma has exited with ' + code);
    process.exit(code);
  });
});
