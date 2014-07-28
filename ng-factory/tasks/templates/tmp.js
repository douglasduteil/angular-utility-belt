'use strict';

var gulp = require('gulp');
var config = require('./../../config'), src = config.src;
var pkg = require(process.cwd() + '/package.json');

var ngtemplate = require('gulp-ngtemplate');
var rename = require('gulp-rename');

gulp.task('ng-factory:templates/src(tmp)', function() {

  // Build unified pkg.name template
  gulp.src(src.templates, {cwd: src.cwd})
    .pipe(ngtemplate({module: pkg.name}))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest(src.tmp + '/templates'))
});
