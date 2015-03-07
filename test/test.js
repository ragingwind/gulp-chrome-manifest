/*global describe, it */
'use strict';

var assert = require('assert');
var manifest = require('../');
var fs = require('fs');
var gutil = require('gulp-util');

describe('gulp-chrome-manifest node module', function () {
  it('should ', function () {
    var stream = manifest();

    stream.on('data', function(file) {
    	console.log(file);
    })

    stream.write(new gutil.File({
    	path: 'fixtures/manifest.json',
    	contents: new Buffer(fs.readFileSync('test/fixtures/manifest.json'))
    }));
    assert(true);
  });
});
