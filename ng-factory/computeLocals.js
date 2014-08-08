var _ = require('lodash');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var bower = require(process.cwd() + '/bower.json');

module.exports = function (configLocals) {
  var src = configLocals.src;
  var pkg = configLocals.pkg;

  var locals = _.extend({}, configLocals, {
    url: [pkg.repository.owner, pkg.repository.name].join('/')
  });

  locals.license = '    ' + fs.readFileSync('LICENSE').toString().replace(/(?:\r?\n)/g, '\n    ');

  locals.dependencies = _.mapValues(bower.devDependencies, function (value) {
    return value.replace('|', '&#124;');
  });

//  locals.examples = {};
//  configLocals.modules.map(function (name) {
//    locals.examples[name] = glob.sync(path.join(name, 'docs', 'examples', '*'), {cwd: src.cwd}).map(function (file) {
//      return {filename: path.join(src.cwd, file), basename: path.basename(file), extname: path.extname(file)};
//    })
//  });

  locals.badges = [
    {
      title: 'Build Status',
      image: 'http://img.shields.io/travis/{{ url }}.svg',
      url: 'http://travis-ci.org/{{ url }}'
    },
    {
      title: 'Coverage Status',
      image: 'http://img.shields.io/codeclimate/coverage/github/{{ url }}.svg',
      url: 'http://url'
    },
    {
      title: 'Github Releases',
      // image: 'http://img.shields.io/github/release/{{ url }}.svg',
      image: 'http://img.shields.io/badge/release-v{{ pkg.version }}-orange.svg',
      url: 'http://github.com/{{ url }}/releases'
    },
    {
      title: 'Github Issues',
      image: 'http://img.shields.io/github/issues/{{ url }}.svg',
      url: 'http://github.com/{{ url }}/issues'
    }
    /*, {
     title: 'CodeClimate status',
     image: 'http://img.shields.io/codeclimate/github/kabisaict/flow.svg',
     url: 'http://url'
     }, {
     title: 'NPM dependencies',
     image: 'http://img.shields.io/david/visionmedia/express.svg',
     url: 'http://url'
     }, {
     title: 'NPM dev dependencies',
     image: 'http://img.shields.io/david/dev/visionmedia/express.svg',
     url: 'http://url'
     }, {
     title: 'Browser support',
     image: 'https://ci.testling.com/substack/tape.png',
     url: 'http://ci.testling.com/substack/tape'
     }*/
  ].map(function (badge) {
      Object.keys(badge).forEach(function (key) {
        badge[key] = badge[key].replace('{{ url }}', locals.url).replace('{{ pkg.version }}', pkg.version);
      });
      return badge;
    });

  return locals;
};


