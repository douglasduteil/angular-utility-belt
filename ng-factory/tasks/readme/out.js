'use strict';

var gulp = require('gulp');
var config = require('./../../config');

var nunjucksRender = config.requireTransform('nunjucksRender');

gulp.task('ng-factory:readme/out', function () {

  return gulp.src('.tmp/readme/README.md')
    .pipe(nunjucksRender(config.computedLocals))
    .pipe(gulp.dest('./'));
});
