/*global describe, it */
'use strict';

var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var Manifest = require('../');

describe('gulp-chrome-manifest node module', function () {

	process.chdir('test/fixtures/');

	var srcString = fs.readFileSync('manifest.json');
	var srcJSON = JSON.parse(srcString);
	var srcFile = new gutil.File({
		path: 'manifest.json',
		contents: new Buffer(srcString)
  });

  it('should returns updated version', function (cb) {
    var stream = new Manifest({
    	buildnumber: true
    });

    stream.on('data', function(file) {
    	if (file.path.indexOf('manifest.json') >= 0) {
    		assert(JSON.parse(file.contents).version === '0.0.2');
    	}
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
    	if (file.path.indexOf('manifest.json') >= 0) {
    		assert(JSON.parse(file.contents).version === '1.0.0');
    	}
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
    var files = [];

    stream.on('data', function(file) {
    	files.push(file.path);

    	if (file.path.indexOf('manifest.json') >= 0) {
	    	var manifest = JSON.parse(file.contents);
	    	console.log(obj);
	    	assert(!manifest.key);
	    	assert(manifest.background.scripts.indexOf('components/jquery/jquery.min.js') === -1);
	    	assert(manifest.background.scripts.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
	    }
    })

    stream.on('end', function() {
    	assert(files.indexOf('scripts/willbe-remove-only-for-debug.js') === -1);
    	assert(files.indexOf('components/jquery/jquery.min.js') === -1);
    	assert(files.indexOf('scripts/user-script.js') === -1);
    	assert(files.indexOf('scripts/background.js') === -1);
    	cb();
    });

    stream.write(srcFile);
    stream.end();
  });
});
