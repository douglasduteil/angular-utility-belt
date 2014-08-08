'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var wrapper = require('gulp-wrapper');
var rename = require('gulp-rename');

var merge = require('merge-stream');

gulp.task('ng-factory:readme/tmp', function () {

  var copyCustom = gulp.src('src/alert/README.partial.md')
      .pipe(rename('README.md'))
      .pipe(wrapper({
        header: '{% extends "README.tpl.md" %}\n'
      }))
      .pipe(gulp.dest('.tmp/readme'))
    ;
  var copyBase = gulp.src('ng-factory/readme/README.tpl.md')
      .pipe(gulp.dest('.tmp/readme'))
    ;
  return merge(copyCustom,copyBase);
});

