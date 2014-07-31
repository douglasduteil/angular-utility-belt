'use strict';


var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var config = require('./../../config');

/**
 * Generate a clean task for the given config keys
 * @param {string} src - the source key
 * @param {string} dest - the destination key
 */
module.exports = function (src, dest) {

  // TODO test is the keys exist

  gulp.task('ng-factory:clean/' + src + '(' + dest + ')', function () {
    return gulp.src(config[src][dest], { read: false})
      .pipe(rimraf());
  });

};
