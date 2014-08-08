
var gulp = require('gulp');
var config = require('../../config');

gulp.task('sync', function (cb) {
  // setTimeout could be any async task
  setTimeout(function () {
    cb();
  }, config.syncDuration);
});
