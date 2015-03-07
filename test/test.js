/*global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var Manifest = require('../');

describe('gulp-chrome-manifest node module', function () {
	var srcString = fs.readFileSync('test/fixtures/manifest.json');
	var srcJSON = JSON.parse(srcString);
	var srcFile = new gutil.File({
		path: 'fixtures/manifest.json',
		contents: new Buffer(srcString)
  });

  it('should returns updated version', function (cb) {
    var stream = new Manifest({
    	buildnumber: true
    });

    stream.on('data', function(file) {
    	assert(JSON.parse(file.contents).version === '0.0.2');
    })
    stream.on('end', cb);
    stream.write(srcFile);
    stream.end();
  });

  it('should returns updated version', function (cb) {
    var stream = new Manifest({
    	buildnumber: '1.0.0'
    });

    stream.on('data', function(file) {
    	assert(JSON.parse(file.contents).version === '1.0.0');
    })
    stream.on('end', cb);
    stream.write(srcFile);
    stream.end();
  });

  it('should returns excluded props', function (cb) {
    var stream = new Manifest({
    	exclude: [
        'key',
        {
        	'background.scripts': [
        		'components/jquery/jquery.min.js',
        		'scripts/willbe-remove-only-for-debug.js'
        	]
        }
      ]
    });

    stream.on('data', function(file) {
    	var manifest = JSON.parse(file.contents);
    	assert(!manifest.key);
    	assert(manifest.background.scripts.indexOf('components/jquery/jquery.min.js') === -1);
    	assert(manifest.background.scripts.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
    })
    stream.on('end', cb);
    stream.write(srcFile);
    stream.end();
  });

  it('should returns updated pros', function (cb) {
    var stream = new Manifest({
    	overwrite: {
        'key': 'new-key',
      	'background.scripts': [
        	'uglify-concat-background.js'
        ]
       }
    });

    stream.on('data', function(file) {
    	var manifest = JSON.parse(file.contents);
    	assert.equal(manifest.key, 'new-key');
    	assert.equal(manifest.background.scripts[0], 'uglify-concat-background.js');
    	assert.equal(manifest.background.scripts.length, 1);
    	
    })
    stream.on('end', cb);
    stream.write(srcFile);
    stream.end();
  });
});
