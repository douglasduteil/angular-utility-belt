'use strict';

var gulp = require('gulp');
var config = require('./../../config'), docs = config.docs;

var Deployor = require('node-git-deployor');


gulp.task('ng-factory:src/deploy:pages', function () {
  var restoreCwd = process.cwd();

  // Assign temporal pkg file version by hand here. No getter.
  var pkg = config.pkg;

  var distWorkspace = Deployor.cloneRepoBranch({
    orphan: true,
    branch: 'gh-pages',
    cloneLocation: '/tmp/pages'
  });

  distWorkspace.extraCleanUp();
  distWorkspace.copy(docs.dest);
  distWorkspace.commit('demo(release): v' + pkg.version + '\n\nUpdate ' + new Date().toISOString());
  distWorkspace.push();

  process.chdir(restoreCwd);

});
