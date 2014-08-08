'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var nunjucks = require('nunjucks');

module.exports = function (options) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }


    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-nunjucks', 'Streaming not supported'));
      return cb();
    }

    try {
      options.name = typeof options.name === 'function' && options.name(file) || file.relative;
      nunjucks.configure(file.base);
      file.contents = new Buffer(nunjucks.renderString(file.contents.toString(), options));
    } catch (err) {
      this.emit('error', new gutil.PluginError('gulp-nunjucks', err, {fileName:  file.path}));
    }

    this.push(file);
    cb();
  });
};


